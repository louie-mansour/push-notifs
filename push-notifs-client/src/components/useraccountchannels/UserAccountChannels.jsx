import "./UserAccountChannels.scss";
import {Button, TextField, FormGroup, FormControlLabel, Switch} from "@mui/material";
import {useState} from "react";

export default function UserAccountChannels(props) {
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
                <UserAccountVerifiableTextField fullWidth label='Email'/>
            </div>
            <div className='UserAccountChannels_inputLine'>
                <UserAccountVerifiableTextField fullWidth label='SMS'/>
            </div>
        </div>
    )
}

function UserAccountVerifiableTextField(props) {
    const editState = 'edit'
    const savedStated = 'saved'
    const verifiedState = 'verified'
    const enabledState = 'enabled'

    let initState;
    if (!props.value) {
        initState = editState
    } else if (!props.isVerified) {
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
            label={props.label}
            variant="standard"
            defaultValue={''}
        />
    } else {
        textField = <TextField
            fullWidth
            id="standard-basic"
            label={props.label}
            variant="standard"
            defaultValue={''}
        />
    }

    let button;
    if (state === editState) {
        button = <Button variant="contained">Save</Button>
    } else {
        button = <Button variant="contained">Edit</Button>
    }

    let switchToggle;
    if (state === editState || state === savedStated) {
        switchToggle = <FormGroup>
            <FormControlLabel disabled control={<Switch checked={false} />} label="Notify" />
        </FormGroup>
    } else {
        switchToggle = <FormGroup>
            <FormControlLabel control={<Switch checked={props.isEnabled} />} label="Notify" />
        </FormGroup>
    }

    const textFieldClassName = props.label === 'Email'
        ? 'UserAccountVerifiableTextField_input UserAccountVerifiableTextField_input--email'
        : 'UserAccountVerifiableTextField_input'

    return (
        <div className='UserAccountVerifiableTextField'>
            <div className={textFieldClassName}>
                {textField}
            </div>
            <div className='UserAccountVerifiableTextField_button'>
                {button}
            </div>
            <div className='UserAccountVerifiableTextField_switch'>
                {switchToggle}
            </div>
        </div>
    )
}