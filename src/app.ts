import express, { Request, Response } from 'express';
import 'dotenv/config';
import bookRouter from './routes/book.route';
import cors from 'cors';



const app = express();

app.use(cors());
app.use(express.json());


app.use('/books', bookRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

const port = process.env.SF_PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
