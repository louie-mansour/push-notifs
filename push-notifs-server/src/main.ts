import * as express from 'express';
import { AppFactory } from './appFactory';
import * as dotenv from 'dotenv';
import { auth } from 'express-oauth2-jwt-bearer';
import { AuthController } from "./controller/AuthController";

dotenv.config();

const { articleController, healthController, userController, appInfoController } =
    AppFactory.create();

const checkJwt = auth({
    audience: 'http://localhost:4000',
    issuerBaseURL: 'https://dev-isnyz8zq.auth0.com/',
});


const app = express();
app.use(express.json());
app.use(AuthController.AuthHeaderFromCookie);
app.use(AuthController.XUserIdFromAuthHeader);

app.get('/health', (req, res) => {
    return healthController.health(req, res);
});

// App Info
app.get('/appinfo', async (req, res) => {
    return await appInfoController.appInfo(req, res);
});

// Articles
app.post('/articles/load', async (req, res) => {
    return await articleController.loadArticles(req, res);
});

app.get('/articles/search', async (req, res) => {
    return await articleController.searchArticles(req, res);
});

// Users
app.get('/auth/callback', async (req, res) => {
    return await userController.loginCallback(req, res);
});

app.get('/user', checkJwt, async (req, res) => {
    return await userController.getUser(req, res);
});

app.put('/user/logout', checkJwt, async (req, res) => {
    return await userController.logout(req, res)
})

app.put('/user/email', checkJwt, async (req, res) => {
    return await userController.changeEmail(req, res)
})

app.post('/user/email/verify', checkJwt, async (req, res) => {
    return await userController.verifyEmail(req, res)
})

app.put('/user/email/enable/:isEnable', checkJwt, async (req, res) => {
    return await userController.enableEmail(req, res)
})

app.put('/user/phone', checkJwt, async (req, res) => {
    return await userController.changePhone(req, res)
})

app.post('/user/phone/verify', checkJwt, async (req, res) => {
    return await userController.verifyPhone(req, res)
})

app.put('/user/phone/enable/:isEnable', checkJwt, async (req, res) => {
    return await userController.enablePhone(req, res)
})

app.put('/user/schedule', checkJwt, async (req, res) => {
    return await userController.setSchedule(req, res)
})

app.put('/user/keywords', checkJwt, async (req, res) => {
    return await userController.setKeywords(req, res)
})

// Begin
app.listen(4000);
