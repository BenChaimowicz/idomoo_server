import { Service } from "typedi";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from 'path';


@Service()
export class FileUploadController {


    public async uploadFile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const file = req.files!.image as UploadedFile;
            const savePath = `${path.resolve(__dirname, '../')}/uploads/1.jpg`;
            file.mv(savePath, (err) => {
                if (err) return res.status(500).send(err);
                const imageURL = '/uploads/1.jpg';
                res.send(imageURL);
            });
        } catch (error) {
            res.send(error);
        }
    }
}