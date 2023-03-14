import NotificationPanel from '../notificationpanel/NotificationPanel.jsx';
import KeywordsPanel from '../keywordspanel/KeywordsPanel.jsx';
import { getUserData } from '../../services/user/UserService.js'
import './LeftSidePanel.scss';
import { useEffect, useState } from 'react';
import NotificationSchedulePanel from "../notificationschedulepanel/NotificationSchedulePanel";

export default function LeftSidePanel() {
    const [userData, setUserData] = useState(undefined);
    useEffect(() => {
        const fetchData = async () => {
            const userDataResponse = await getUserData('uuid-v4');
            setUserData(userDataResponse);
        }
        fetchData()
            .catch(err => console.log(err))
    }, []);

    if (!userData) {
        return (
            <div className='LeftSidePanel'>
                <p>Loading...</p>
            </div>
        )
    }
    return (
        <div className='LeftSidePanel'>
            <NotificationSchedulePanel schedule={userData.user.schedule}/>
            <NotificationPanel contact={userData.user.contact} />
            <KeywordsPanel keywords={userData.user.keywords} />
        </div>
    )
}