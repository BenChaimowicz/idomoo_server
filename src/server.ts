import * as dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();
import express from 'express';
import bodyParser from "body-parser"
import { allRouter } from './routes/all.routes';
import cors from 'cors';
import fileUpload from 'express-fileupload';


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', allRouter);

const port: number = Number(process.env.PORT) || 3001;


app.listen(port, () => console.log(`Listening on port ${port}...`));