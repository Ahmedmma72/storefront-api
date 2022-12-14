import express, { Request, Response } from 'express';
import 'dotenv/config';
import router from './api/app.router';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);



const port = process.env.SF_PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//handle non existing routes
app.use((req: Request, res: Response) => {
  res.status(404).send('Not found');
});
