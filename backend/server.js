import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

connectDB();

// middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API WORKING...');
});

app.post('/clerk', express.json(), clerkWebhooks);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
