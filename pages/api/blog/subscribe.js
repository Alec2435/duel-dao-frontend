import database from '../../../src/service/database';
// import messenger from '../../../src/service/messenger';
// import emailService from '../../../src/service/email';

export default async (req, res) => {
    const email = req.body.email;

    try {
        await database.subscribeToBlog(email);
        // await messenger.notifyNewSubscriber(email);
        // await emailService.sendWelcomeEmail(email);

        res.json({ success: true });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            error: e
        })
    }
}