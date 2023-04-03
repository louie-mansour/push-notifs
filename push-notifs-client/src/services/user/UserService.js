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

export async function changeEmail(email) {
    let response;
    try {
        response = await axios.put('/user/email', {
            email: email,
        });
    } catch (e) {
        console.log(e);
    }
    return response.data;
}

export async function verifyEmailCode(code) {
    let response;
    try {
        response = await axios.post('/user/email/verify', {
            verification_code: code,
        });
    } catch (e) {
        console.log(e);
    }
    return response.data;
}

export async function enableEmailNotifications(isEnable) {
    let response;
    try {
        response = await axios.put(`/user/email/enable/${isEnable}`);
    } catch (e) {
        console.log(e);
    }
    return response.data;
}

export async function changePhone(phone) {
    let response;
    try {
        response = await axios.put('/user/phone', {
            phone: phone,
        });
    } catch (e) {
        console.log(e);
    }
    return response.data;
}

export async function verifyPhoneCode(code) {
    let response;
    try {
        response = await axios.post('/user/phone/verify', {
            verification_code: code,
        });
    } catch (e) {
        console.log(e);
    }
    return response.data;
}

export async function enablePhoneNotifications(isEnable) {
    let response;
    try {
        response = await axios.put(`/user/phone/enable/${isEnable}`);
    } catch (e) {
        console.log(e);
    }
    return response.data;
}

export async function setSchedule(schedule) {
    let response;
    try {
        response = await axios.put('/user/schedule', {
            schedule: schedule,
        });
    } catch (e) {
        console.log(e);
    }
    return response.data;
}

export async function setKeywords(keywords) {
    let response;
    try {
        response = await axios.put('/user/keywords', {
            keywords: keywords,
        });
    } catch (e) {
        console.log(e);
    }
    return response.data;
}