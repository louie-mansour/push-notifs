import "./UserAccountChannels.scss";
import {Button, TextField, FormGroup, FormControlLabel, Switch} from "@mui/material";
import {useState} from "react";

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

    const { label, value, isVerified, setContact } = props;

    let initState;
    if (!value) {
        initState = editState
    } else if (!isVerified) {
        initState = savedStated
    } else if (!props.isEnabled) {
        initState = verifiedState
    } else {
        initState = enabledState
    }

    const [state, setState] = useState(initState);

    let textField
    if (state === editState) {
        textField = <TextField
            fullWidth
            id="standard-basic"
            label={label}
            variant="standard"
            defaultValue={value ?? ''}
        />
    } else {
        textField = <TextField
            fullWidth
            disabled
            id="standard-basic"
            label={props.label}
            variant="standard"
            defaultValue={value}
        />
    }

    let saveButton;
    if (state === editState) {
        saveButton = (
            <Button
                variant="contained"
                onClick={() => { setState(savedStated); }}
            >
                Save
            </Button>
        )
    } else {
        saveButton = (
            <Button
                variant="contained"
                onClick={() => { setState(editState); }}
            >
                Edit
            </Button>
        )
    }

    let verificationButton;
    if (state === savedStated) {
        verificationButton = <Button variant="contained">Resend Verification</Button>
    } else if (state === verifiedState || enabledState) {
        verificationButton = <Button disabled variant="contained">Verified :)</Button>
    } else {
        verificationButton = <Button disabled variant="contained">Resend Verification</Button>
    }

    let switchToggle;
    if (state === editState || state === savedStated) {
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