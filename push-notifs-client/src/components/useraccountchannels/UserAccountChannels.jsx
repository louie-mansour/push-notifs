import "./UserAccountChannels.scss";
import {Button, FormControlLabel, FormGroup, Switch, TextField} from "@mui/material";
import {useCallback, useState} from "react";
import {changeEmail, changePhone, verifyEmailCode, verifyPhoneCode} from "../../services/user/UserService";

export default function UserAccountChannels(props) {
    const { contact, setContact } = props;
    if (!contact) {
        return (
            <div className='UserAccountChannels'>
                <h2 className='UserAccountChannels_header'>Notification Channels</h2>
                <p className='UserAccountChannels_description'>
                    We only send notifications to emails and phone numbers that have been verified.
                </p>
                <p className='UserAccountChannels_description'>
                    Refresh the page to get an up-to-date verification status.
                </p>
            </div>
        );
    }
    return (
        <div className='UserAccountChannels'>
            <h2 className='UserAccountChannels_header'>Notification Channels</h2>
            <p className='UserAccountChannels_description'>
                We only send notifications to emails and phone numbers that have been verified.
            </p>
            <p className='UserAccountChannels_description'>
                Refresh the page to get an up-to-date verification status.
            </p>
            <div className='UserAccountChannels_inputLine'>
                <UserAccountVerifiableTextField
                    fullWidth
                    label='Email'
                    type='email'
                    value={contact.email}
                    isVerified={contact.isEmailVerified}
                    isEnabled={contact.isEmailEnabled}
                    setContact={setContact}
                />
            </div>
            <div className='UserAccountChannels_inputLine'>
                <UserAccountVerifiableTextField
                    fullWidth
                    label='SMS'
                    type='sms'
                    value={contact.phone}
                    isVerified={contact.isPhoneVerified}
                    isEnabled={contact.isPhoneEnabled}
                    setContact={setContact}
                />
            </div>
        </div>
    )
}

function UserAccountVerifiableTextField(props) {
    const editState = 'edit'
    const savedStated = 'saved'
    const verifiedState = 'verified'
    const enabledState = 'enabled'

    const { label, value, isVerified, setContact, type } = props;

    let initLifecycleState;
    if (!value) {
        initLifecycleState = editState
    } else if (!isVerified) {
        initLifecycleState = savedStated
    } else if (!props.isEnabled) {
        initLifecycleState = verifiedState
    } else {
        initLifecycleState = enabledState
    }

    const [lifecycleState, setLifecycleState] = useState(initLifecycleState);
    const [inputText, setInputText] = useState(value ?? '');
    const [confirmationCode, setConfirmationCode] = useState(undefined);
    const changeEmailCallback = useCallback(async () => {
        const responseData = await changeEmail(inputText)
        const contact = responseData.contact;
        setContact(contact);
    }, [inputText, setContact])

    const verifyEmailCallback = useCallback(async () => {
        const responseData = await verifyEmailCode(confirmationCode)
        setLifecycleState(verifiedState)
    })
    const changePhoneCallback = useCallback(async () => {
        const responseData = await changePhone(inputText)
        const contact = responseData.contact;
        setContact(contact);
    }, [inputText, setContact])

    const verifyPhoneCallback = useCallback(async () => {
        const responseData = await verifyPhoneCode(confirmationCode)
        setLifecycleState(verifiedState)
    })

    let textField
    if (lifecycleState === editState) {
        textField = <TextField
            fullWidth
            id="standard-basic"
            label={label}
            variant="standard"
            value={inputText}
            onChange={onChangeTextInput}
            onKeyUp={onKeyupTextInput}
        />
    } else {
        textField = <TextField
            fullWidth
            disabled
            id="standard-basic"
            label={props.label}
            variant="standard"
            value={value}
        />
    }

    let saveButton;
    if (lifecycleState === editState) {
        saveButton = (
            <Button
                variant="contained"
                onClick={() => { onClickSaveButton(type); }}
            >
                Save
            </Button>
        )
    } else {
        saveButton = (
            <Button
                variant="contained"
                onClick={() => { setLifecycleState(editState); }}
            >
                Edit
            </Button>
        )
    }

    let resendVerificationButton;
    if (lifecycleState === savedStated) {
        resendVerificationButton = (
            <Button
                variant="contained"
                onClick={() => { onClickSaveButton(type); }}
            >
                Resend Verification
            </Button>)
    } else {
        resendVerificationButton = (
            <Button
                disabled
                variant="contained"
            >
                Resend Verification
            </Button>)
    }

    let verificationInput;
    if (lifecycleState === savedStated) {
        verificationInput = (
            <TextField
                fullWidth
                id="standard-basic"
                label={'Confirmation code'}
                variant="standard"
                value={confirmationCode}
                onChange={onChangeVerificationInput}
                onKeyUp={onKeyupVerificationInput}
            />
        )
    } else {
        verificationInput = (
            <TextField
                fullWidth
                disabled
                id="standard-basic"
                label={'Confirmation code'}
                variant="standard"
                value={''}
            />
        )
    }

    let confirmVerificationButton;
    if (lifecycleState === savedStated) {
        confirmVerificationButton = (
            <Button
                variant="contained"
                onClick={() => { onClickConfirmVerificationButton(type); }}
            >
                Confirm Verification
            </Button>
        )
    } else {
        confirmVerificationButton = (
            <Button
                disabled
                variant="contained"
            >
                Confirm Verification
            </Button>)
    }

    let switchToggle;
    if (lifecycleState === editState || lifecycleState === savedStated) {
        switchToggle =
            (
                <FormGroup>
                    <FormControlLabel
                        disabled
                        control={
                            <Switch
                                checked={false}
                            />}
                        label="Notify" />
                </FormGroup>
            )
    } else {
        switchToggle =
            (
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={props.isEnabled}
                                onChange={() => onToggleSwitch(type)}
                            />}
                        label="Notify" />
                </FormGroup>
            )
    }
    return (
        <div className='UserAccountVerifiableTextField'>
            <div className='UserAccountVerifiableTextField_input'>
                {textField}
            </div>
            <div className='UserAccountVerifiableTextField_button'>
                {saveButton}
            </div>
            <div className='UserAccountVerifiableTextField_button'>
                {resendVerificationButton}
            </div>
            <div className='UserAccountVerifiableTextField_input'>
                {verificationInput}
            </div>
            <div className='UserAccountVerifiableTextField_button'>
                {confirmVerificationButton}
            </div>
            <div className='UserAccountVerifiableTextField_switch'>
                {switchToggle}
            </div>
        </div>
    )

    function onChangeTextInput(e) {
        setInputText(e.target.value);
    }

    function onKeyupTextInput(e) {
        if (e.keyCode === 13) {
            onClickSaveButton()
        }
    }

    function onClickSaveButton(type) {
        setLifecycleState(savedStated)
        if (type === 'sms') {
            setContact(c => {
                return {
                    ...c,
                    phone: inputText,
                }
            })
            return changePhoneCallback()
        }
        setContact(c => {
            return {
                ...c,
                email: inputText,
            }
        })
        changeEmailCallback()
    }

    function onChangeVerificationInput(e) {
        setConfirmationCode(e.target.value)
    }

    function onKeyupVerificationInput(e) {
        if (e.keyCode === 13) {
            onClickSaveButton()
        }
    }

    function onClickConfirmVerificationButton(type) {
        if (type === 'sms') {
            verifyPhoneCallback()
        }
        verifyEmailCallback()
    }

    function onToggleSwitch(type) {
        if (type === 'sms') {
            return setContact(c => {
                return {
                    ...c,
                    isPhoneEnabled: !c.isPhoneEnabled,
                }
            })
        }
        return setContact(c => {
            return {
                ...c,
                isEmailEnabled: !c.isEmailEnabled,
            }
        })
    }
}