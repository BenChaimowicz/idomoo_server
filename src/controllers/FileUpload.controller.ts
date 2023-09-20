import { Service } from "typedi";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import { createReadStream } from 'streamifier';


@Service()
export class FileUploadController {


    public async uploadFile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const file = req.files!.image as UploadedFile;
            if (!file) throw new Error('No file');
            const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

            cloudinary.config({
                cloud_name: CLOUD_NAME,
                api_key: API_KEY,
                api_secret: API_SECRET
            });
            const uploadStream = cloudinary.uploader.upload_stream({ folder: 'idomoo', overwrite: true }, function (e, r) {
                if (e) return res.status(500).send({ msg: e.message, code: e.http_code, name: e.name });
                console.log(r);
                res.send(r?.secure_url);
            });
            createReadStream(file.data).pipe(uploadStream)

            uploadStream.addListener('close', () => console.log('upload finished'));
        } catch (error) {
            res.send(error);
        }
    }
}