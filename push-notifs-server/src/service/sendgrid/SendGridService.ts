import * as sgMail from '@sendgrid/mail'

export class SendGridService {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    public async sendVerificationEmail(email: string, verificationCode: string) {
        const msg = {
            to: email,
            from: 'notifyme@louiem.dev',
            subject: 'Email verification for notify.me',
            text: `Hello!
            
            This is an automated message from notify.me.
            Your verification code is ${verificationCode}.
            
            Thank you!
            `,

            html: `
            <div>
                <p>Hello!</p>
                <br />
                <p>This is an automated message from notify.me.</p>
                <p>Your verification code is <strong>${verificationCode}</strong>.</p>
                <br />
                <p>Thank you!</p>
            </div>
            `,
        }

        try {
            const res = await sgMail.send(msg);
            console.log('email sent');
        } catch (e) {
            console.error(e)
        }
    }
}