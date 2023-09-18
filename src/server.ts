import * as dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();
import express from 'express';
import bodyParser from "body-parser"
import { allRouter } from './routes/all.routes';
import cors from 'cors';
import path from 'path';


const app = express();
app.use(cors());
app.use(bodyParser.json());
const staticPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(path.join(staticPath)));
app.use('/api', allRouter);

console.log(staticPath);

const port: number = Number(process.env.PORT) || 3001;


app.listen(port, () => console.log(`Listening on port ${port}...`));