import './UserAccountSchedule.scss'
import {FormControl, FormGroup, FormControlLabel, Checkbox, Button} from "@mui/material";
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as dayjs from 'dayjs'

export default function UserAccountSchedule(props) {
    return (
        <div className='UserAccountSchedule'>
            <h2 className='UserAccountSchedule_header'>Notification Schedule</h2>
            <p className='UserAccountSchedule_description'>
                We only send notifications at the selected days and times.
            </p>
            <p className='UserAccountSchedule_description'>
                If no day or time is selected you won't receive notifications.
            </p>
            <div className='UserAccountSchedule_inputLine'>
                <UserAccountTimePicker />
                <UserAccountDayPicker />
                <SaveButton />
            </div>
        </div>
    )
}

function UserAccountTimePicker(props) {
    return (
        <div className='UserAccountTimePicker'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl component="fieldset">
                    <FormGroup aria-label="notification days" row>
                        <TimeField
                            label="Notification Time"
                            defaultValue={dayjs('2022-04-12T15:00')}
                        />
                    </FormGroup>
                </FormControl>
            </LocalizationProvider>
        </div>
    );
}

function UserAccountDayPicker(props) {
    const DAYS = [
        {
            key: "Sunday",
            label: "Sunday"
        },
        {
            key: "Monday",
            label: "Monday"
        },
        {
            key: "Tuesday",
            label: "Tuesday"
        },
        {
            key: "Wednesday",
            label: "Wednesday"
        },
        {
            key: "Thursday",
            label: "Thursday"
        },
        {
            key: "Friday",
            label: "Friday"
        },
        {
            key: "Saturday",
            label: "Saturday"
        }
    ];
    return (
        <div className='UserAccountDayPicker'>
            <FormGroup>
                { DAYS.map((day) => {
                    return <FormControlLabel control={<Checkbox defaultChecked />} label={day.key} />
                })}
            </FormGroup>
        </div>
    );
}

function SaveButton(props) {
    return (
        <div className='SaveButton'>
            <Button variant="contained">Save</Button>
        </div>
    )
}