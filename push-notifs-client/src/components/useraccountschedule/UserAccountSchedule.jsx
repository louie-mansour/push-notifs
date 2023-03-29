import './UserAccountSchedule.scss'
import {FormControl, FormGroup, FormControlLabel, Checkbox, Button} from "@mui/material";
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function UserAccountSchedule(props) {
    const { schedule, setSchedule } = props
    if (!schedule) {
        return (
            <div className='UserAccountSchedule'>
                <h2 className='UserAccountSchedule_header'>Notification Schedule</h2>
                <p className='UserAccountSchedule_description'>
                    We only send notifications at the selected days and times.
                </p>
                <p className='UserAccountSchedule_description'>
                    If no day or time is selected you won't receive notifications.
                </p>
            </div>
        );
    }
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
                <UserAccountTimePicker
                    schedule={schedule}
                    setSchedule={setSchedule}
                />
                <UserAccountDayPicker
                    schedule={schedule}
                    setSchedule={setSchedule}
                />
                <SaveButton />
            </div>
        </div>
    )
}

function UserAccountTimePicker(props) {
    const { schedule, setSchedule} = props;
    return (
        <div className='UserAccountTimePicker'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl component="fieldset">
                    <FormGroup aria-label="notification days" row>
                        <TimeField
                            label="Notification Time"
                            value={schedule.time}
                            onChange={(newValue) => onChangeTime(newValue)}
                        />
                    </FormGroup>
                </FormControl>
            </LocalizationProvider>
        </div>
    );

    function onChangeTime(time) {
        setSchedule(prev => {
            return {
                ...prev,
                time: time,
            }
        })
    }
}

function UserAccountDayPicker(props) {
    const DAYS = [
        {
            key: "sunday",
            label: "Sunday"
        },
        {
            key: "monday",
            label: "Monday"
        },
        {
            key: "tuesday",
            label: "Tuesday"
        },
        {
            key: "wednesday",
            label: "Wednesday"
        },
        {
            key: "thursday",
            label: "Thursday"
        },
        {
            key: "friday",
            label: "Friday"
        },
        {
            key: "saturday",
            label: "Saturday"
        }
    ];
    const { schedule, setSchedule } = props;
    return (
        <div className='UserAccountDayPicker'>
            <FormGroup>
                { DAYS.map((day) => {
                    return (
                        <FormControlLabel
                            control={<Checkbox checked={schedule[day.key]} />}
                            label={day.label}
                            onChange={() => onClickCheckbox(day.key)}
                        />
                    )
                })}
            </FormGroup>
        </div>
    );
    function onClickCheckbox(day) {
        setSchedule(s => {
            s[day] = !s[day]
            return { ...s };
        })
    }
}

function SaveButton(props) {
    return (
        <div className='SaveButton'>
            <Button variant="contained">Save</Button>
        </div>
    )
}