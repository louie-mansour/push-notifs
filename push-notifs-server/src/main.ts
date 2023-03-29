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
app.use(AuthController.AuthHeaderFromCookie);
app.use(AuthController.XUserIdFromAuthHeader);

app.get('/health', checkJwt, (req, res) => {
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

app.put('/user/logout', async (req, res) => {
    return await userController.logout(req, res)
})

// Begin
app.listen(4000);
