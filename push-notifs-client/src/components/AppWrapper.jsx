import {getAppInfo} from "../services/appinfo/AppInfoService";
import {useEffect, useState} from "react";

export default function AppWrapper(props) {
    const [appInfo, setAppInfo] = useState({
        isLoggedIn: false,
        userId: 'anon'
    });
    useEffect(() => {
        const fetchAppInfo = async () => {
            const appInfo = await getAppInfo()
            setAppInfo(appInfo)
        }
        fetchAppInfo()
            .catch(err => console.log(err))
    }, [])
    return <div className='AppWrapper'>
        {props.children}
    </div>
}