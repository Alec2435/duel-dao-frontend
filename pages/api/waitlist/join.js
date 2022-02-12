import database from '../../../src/service/database';

export default async (req, res) => {
    const email = req.body.email;

    try {

        //TODO add emailr snippet for thanks for joining

        await database.addToWaitlist(email);

        res.json({ success: true });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            error: e
        })
    }
}