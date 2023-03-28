import "./UserAccountContent.scss";
import UserAccountChannels from "../useraccountchannels/UserAccountChannels";
import UserAccountSchedule from "../useraccountschedule/UserAccountSchedule";
import UserAccountKeywords from "../useraccountkeywords/UserAccountKeywords";
import UserAccountGeneral from "../useraccountgeneral/UserAccountGeneral";

export default function UserAccountContent(props) {
    return (
        <div className='UserAccountContent'>
            <div className='UserAccountContent_wrapper'>
                <h1 className='UserAccountContent_header'>
                    Account Settings
                </h1>
                <div className='UserAccountContent_group'>
                    <UserAccountChannels />
                </div>
                <hr />
                <div className='UserAccountContent_group'>
                    <UserAccountSchedule />
                </div>
                <hr />
                <div className='UserAccountContent_group'>
                    <UserAccountKeywords />
                </div>
                <hr />
                <div className='UserAccountContent_group'>
                    <UserAccountGeneral />
                </div>
            </div>
        </div>
    )
}