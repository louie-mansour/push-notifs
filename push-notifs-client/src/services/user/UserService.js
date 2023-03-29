import axios from 'axios';
import * as dayjs from 'dayjs'

export async function userLogout() {
    try {
        await axios.put(`/user/logout`);
    } catch (e) {
        console.log(e);
    }
}

export async function getUser() {
    let response;
    try {
        response = await axios.get('/user');
    } catch (e) {
        if (e.response.status === 401) {
            return { isAnonymous: true }
        }
    }
    response.data.user.schedule["time"] = dayjs(response.data.user.schedule.time)
    return response.data;
}