import './NotificationSchedulePanel.scss'
import {CalendarMonth, Schedule} from "@mui/icons-material";

export default function NotificationSchedulePanel(props) {
    return (
        <div className='NotificationSchedulePanel'>
            <h3 className='NotificationSchedulePanel_header'>Notify me at</h3>
            <NotificationSchedule
                icon={<Schedule />}
                data={props.schedule.time}
            />
            <NotificationSchedule
                icon={<CalendarMonth />}
                data={props.schedule.day}
            />
        </div>
    )
}

function NotificationSchedule(props) {
    return (
        <div className='NotificationSchedule'>
            <div className='NotificationSchedule_icon'>
                {props.icon}
            </div>
            <p className='NotificationSchedule_data'>{props.data}</p>
        </div>
    )
}