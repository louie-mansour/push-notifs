import "./UserAccountChannels.scss";
import {Button, FormControlLabel, FormGroup, Switch, TextField} from "@mui/material";
import {useCallback, useState} from "react";
import {changeEmail, changePhone} from "../../services/user/UserService";

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
    const [text, setText] = useState(value ?? '');
    const changeEmailCallback = useCallback(async () => {
        const responseData = await changeEmail(text)
        const contact = responseData.contact;
        setContact(contact);
    }, [text, setContact])

    const changePhoneCallback = useCallback(async () => {
        const responseData = await changePhone(text)
        const contact = responseData.contact;
        setContact(contact);
    }, [text, setContact])

    let textField
    if (lifecycleState === editState) {
        textField = <TextField
            fullWidth
            id="standard-basic"
            label={label}
            variant="standard"
            value={text}
            onChange={onChangeInput}
            onKeyUp={onKeyupInput}
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

    let verificationButton;
    if (lifecycleState === savedStated) {
        verificationButton = <Button variant="contained">Resend Verification</Button>
    } else if (lifecycleState === verifiedState || enabledState) {
        verificationButton = <Button disabled variant="contained">Verified :)</Button>
    } else {
        verificationButton = <Button disabled variant="contained">Resend Verification</Button>
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
                                onChange={() => onToggleSwitch('')}
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
                {verificationButton}
            </div>
            <div className='UserAccountVerifiableTextField_switch'>
                {switchToggle}
            </div>
        </div>
    )

    function onChangeInput(e) {
        setText(e.target.value);
    }

    function onKeyupInput(e) {
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
                    phone: text,
                }
            })
            return changePhoneCallback()
        }
        setContact(c => {
            return {
                ...c,
                email: text,
            }
        })
        changeEmailCallback()
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