import * as twilio from 'twilio'
export class TwilioService {
    private readonly client;
    constructor() {
        this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    public async sendVerificationSMS(phoneNumber: string, verificationCode: string) {
        try {
            await this.client.messages
                .create({
                    body: `Your notify.me verification code is ${verificationCode}`,
                    from: '+13656546616',
                    to: phoneNumber,
                })
            console.log('success')
        } catch (e) {
            console.error(e)
        }
    }
}