import express from 'express';

export class HealthController {
    health(req: express.Request, res: express.Response) {
        res.send('fine');
    }
}
