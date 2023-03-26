import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { User } from '../../domain/User';

export class Auth0Service {
    public async exchange(
        authorizationCode: string,
    ): Promise<{ accessToken: string; user: User }> {
        let response;
        try {
            response = await axios.post(process.env.AUTH0_EXCHANGE_URL, {
                grant_type: 'authorization_code',
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                code: authorizationCode,
                redirect_uri: process.env.AUTH0_REDIRECT_URI,
            });
            const decodedIdToken = jwt_decode(response.data.id_token) as any;
            return {
                accessToken: response.data.access_token,
                user: new User({
                    id: decodedIdToken.push_notifs_uuid,
                    email: decodedIdToken.email,
                    emailVerified: decodedIdToken.email_verified && new Date(),
                    phone: decodedIdToken.phone,
                    phoneVerified: decodedIdToken.phone_verified && new Date(),
                    loginDatetime: new Date(),
                }),
            };
        } catch (err) {
            console.log(err);
        }
    }
}
