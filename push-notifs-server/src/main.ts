import * as express from 'express';
import { AppFactory } from './appFactory';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

const { articleController, healthController, userController, authController } =
  AppFactory.create();

// Operational
app.get('/health', (req, res) => {
  return healthController.health(req, res);
});

// Articles
app.post('/articles/load', async (req, res) => {
  return await articleController.loadArticles();
});

app.get('/articles/search', async (req) => {
  return await articleController.searchArticles(req);
});

// Users
// app.post('/user', async (req) => {
//   return await userController.createUser(req);
// });

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
