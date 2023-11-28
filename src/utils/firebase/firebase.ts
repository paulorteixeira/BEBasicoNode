import { NextFunction, Request, Response } from 'express';

var admin = require('firebase-admin');

import serviceAccount from './firebase-key.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.BUCKET,
});

const bucket = admin.storage().bucket();

async function uploadImage(file: Express.Multer.File) {
    try {
        if (!file) {
            return { error: 'No file provided' };
        }
        const fileName = `${Date.now()}` + file.originalname;
        var buffer = new Uint8Array(file.buffer);
        const url = await bucket.file(fileName);
        //.getSignedUrl({ action: 'read', expires: '03-01-2500' });
        await bucket.file(fileName).save(buffer, { resumable: true });
        url.makePublic();
        return {
            tipo: file.fieldname,
            url: `https://storage.googleapis.com/${process.env.BUCKET}/${fileName}`,
        };
    } catch (error: any) {
        return error.message;
    }
}

const addImage = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<any> => {
    try {
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            //return res.status(400).json({ error: 'No files were uploaded.' });
            return next();
        }

        const urls = await Promise.all(files.map(uploadImage));
        req.body.urls = urls;
        //res.json({ urls });
        return next();
    } catch (error: any) {
        res.status(400).send(error.message);
    }
};

export default addImage;
