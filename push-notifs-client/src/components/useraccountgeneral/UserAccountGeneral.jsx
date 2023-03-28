import './UserAccountGeneral.scss';
import {Button} from "@mui/material";

export default function UserAccountGeneral(props) {
    return (
        <div className='UserAccountGeneral'>
            <h2 className='UserAccountKeywords_header'>General Settings</h2>
            <p className='UserAccountKeywords_description'>
                Manage general account settings.
            </p>
            <div className='UserAccountChannels_inputLine'>
                <Logout />
            </div>
        </div>
    )
}

function Logout() {
    return (
        <div className='Logout'>
            <Button variant="contained">Logout</Button>
        </div>
    )
}