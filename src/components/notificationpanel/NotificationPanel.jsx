import './NotificationPanel.scss'
import {Email, Sms} from "@mui/icons-material";

export default function NotificationPanel(props) {
    return (
        <div className='NotificationPanel'>
            <h3 className='NotificationPanel_header'>Notify me by</h3>
            <NotificationChannel
                icon={<Sms />}
                data={props.contact.phone}
            />
            <NotificationChannel
                icon={<Email />}
                data={props.contact.email}
            />
        </div>
    )
}

function NotificationChannel(props) {
    return (
        <div className='NotificationMethod'>
            <div className='NotificationMethod_icon'>
                {props.icon}
            </div>
            <p className='NotificationMethod_data'>{props.data}</p>
        </div>
    )
}