import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the server' });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
