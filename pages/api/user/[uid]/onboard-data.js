const database = require('../../../../src/service/database');

export default async (req, res) => {
    const uid = req.query.uid;
    const { onboardData, browser } = req.body;

    await database.writeOnboardData(uid, onboardData, browser);

    res.send('OK');
}