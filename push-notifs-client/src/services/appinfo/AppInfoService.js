import axios from 'axios';

export async function getAppInfo() {
    let appInfo;
    try {
        appInfo = (await axios.get('/appinfo')).data;
    } catch (e) {
        console.log(e);
    }
    return appInfo;
}