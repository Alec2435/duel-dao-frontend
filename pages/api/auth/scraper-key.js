import database from '../../../src/service/database';
import fs from 'fs';
import path from 'path';

const scraperKeyFile = path.join(process.cwd(), 'src/resources/scraper_git_pk');

export default async (req, res) => {
    const authToken = req.query.authToken;

    const user = database.getUserByAuthToken(authToken);

    if (!user) {
        return res.status(403).json({ error: true, message: 'Auth token does not match any user, please login again.' });
    }

    return new Promise(resolve => {
        fs.readFile(scraperKeyFile, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: true, message: "Unexpected error occurred, please report this for a bug bounty reward in the form of free access to Pave.so:", err });
            }
            resolve(
                res.json({
                    error: false,
                    sshKey: data.toString()
                })
            );
        })
    });

}