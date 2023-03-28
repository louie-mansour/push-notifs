import * as express from 'express';
import { AppFactory } from './appFactory';
import * as dotenv from 'dotenv';
import { auth } from 'express-oauth2-jwt-bearer';
import { AuthController } from "./controller/AuthController";

dotenv.config();

const { articleController, healthController, userController, authController, appInfoController } =
    AppFactory.create();

const checkJwt = auth({
    audience: 'http://localhost:4000',
    issuerBaseURL: 'https://dev-isnyz8zq.auth0.com/',
});


const app = express();
app.use(AuthController.AuthHeaderFromCookie);

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
// app.post('/user', async (req) => {
//   return await userController.createUser(req);
// });

app.put('/user/logout', async (req, res) => {
    return await authController.logout(req, res)
})

app.put('/user/:userId', async (req) => {
    return await userController.updateUser(req);
});

app.get('/user/:userId', async (req) => {
    return await userController.getUser(req);
});

// Auth
app.get('/auth/callback', async (req, res) => {
    return await authController.callback(req, res);
});

// Begin
app.listen(4000);
