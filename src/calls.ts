import { Router, Request, Response } from 'express';
import amqp from 'amqplib';

const router: Router = Router();

router.post('/call-inbound', async (req: Request, res: Response) => {

    try {
        const connection = await amqp.connect(process.env.AMQP_URL);
        const channel = await connection.createChannel();
        await channel.sendToQueue('calls', Buffer.from(JSON.stringify(req.body)), { persistent: true });
        await channel.close();
        await connection.close();
        res.json({success: true, message: 'Event Succesfully Queued'});
    } catch (e) {
        res.status(500).json({success: false, message: e.message})
    }
 
});

export default router;