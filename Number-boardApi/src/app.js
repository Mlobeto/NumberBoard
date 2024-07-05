import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import numberRoutes from './routes/numberRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Rutas
app.use('/numbers', numberRoutes);

export default app;

