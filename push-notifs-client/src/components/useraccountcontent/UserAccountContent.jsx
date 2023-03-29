import "./UserAccountContent.scss";
import UserAccountChannels from "../useraccountchannels/UserAccountChannels";
import UserAccountSchedule from "../useraccountschedule/UserAccountSchedule";
import UserAccountKeywords from "../useraccountkeywords/UserAccountKeywords";
import UserAccountGeneral from "../useraccountgeneral/UserAccountGeneral";
import {useEffect, useState} from "react";
import {getUser} from "../../services/user/UserService";

export default function UserAccountContent(props) {
    const [contact, setContact] = useState(undefined);
    const [schedule, setSchedule] = useState(undefined);
    const [keywords, setKeywords] = useState(undefined);
    useEffect(() => {
        const fetchUser = async () => {
            const { user } = await getUser();
            setContact(user.contact);
            setSchedule(user.schedule);
            setKeywords(user.keywords);
        }
        fetchUser()
            .catch((e) => { console.log(e); })
    }, [])
    return (
        <div className='UserAccountContent'>
            <div className='UserAccountContent_wrapper'>
                <h1 className='UserAccountContent_header'>
                    Account Settings
                </h1>
                <div className='UserAccountContent_group'>
                    <UserAccountChannels
                        contact={contact}
                        setContact={setContact}
                    />
                </div>
                <hr />
                <div className='UserAccountContent_group'>
                    <UserAccountSchedule
                        schedule={schedule}
                        setSchedule={setSchedule}
                    />
                </div>
                <hr />
                <div className='UserAccountContent_group'>
                    <UserAccountKeywords
                        keywords={keywords}
                        setKeywords={setKeywords}
                    />
                </div>
                <hr />
                <div className='UserAccountContent_group'>
                    <UserAccountGeneral />
                </div>
            </div>
        </div>
    )
}