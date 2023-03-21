import axios from 'axios';

export class Auth0Service {
  public async exchange(authorizationCode: string) {
    let response;
    try {
      response = await axios.post(process.env.AUTH0_EXCHANGE_URL, {
        grant_type: 'authorization_code',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: authorizationCode,
        redirect_uri: process.env.AUTH0_REDIRECT_URI,
      });
    } catch (err) {
      console.log(err);
    }
    return response.data.accessToken;
  }
}
