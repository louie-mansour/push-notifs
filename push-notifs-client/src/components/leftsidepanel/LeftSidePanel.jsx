import NotificationPanel from '../notificationpanel/NotificationPanel.jsx';
import KeywordsPanel from '../keywordspanel/KeywordsPanel.jsx';
import { getUser } from '../../services/user/UserService.js'
import './LeftSidePanel.scss';
import { useEffect, useState } from 'react';
import NotificationSchedulePanel from "../notificationschedulepanel/NotificationSchedulePanel";

export default function LeftSidePanel() {
    const [isAnonymous, setIsAnonymous] = useState(undefined)
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        const fetchUser = async () => {
            const responseData = await getUser();
            setIsAnonymous(responseData.isAnonymous)

            if (!responseData.isAnonymous) {
                setUser(responseData.user);
            }
        }
        fetchUser()
            .catch(err => console.log(err))
    }, []);

    if (isAnonymous === undefined) {
        return (
            <div className='LeftSidePanel'>
                <p>Loading...</p>
            </div>
        )
    }
    if (isAnonymous) {
        return (
            <div className='LeftSidePanel'>
                <p>Sign in for access to this panel</p>
            </div>
        )
    }
    return (
        <div className='LeftSidePanel'>
            <NotificationSchedulePanel schedule={user.schedule}/>
            <NotificationPanel contact={user.contact} />
            <KeywordsPanel keywords={user.keywords} />
        </div>
    )
}