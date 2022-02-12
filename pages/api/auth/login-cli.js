import database from '../../../src/service/database';

export default async (req, res) => {
    const authToken = req.body.authtoken;

    const user = await database.getUserByAuthToken(authToken);
    console.log(user)
    if (user) {
        res.json(user);
    } else {
        res.status(403).json(user);
    }
}