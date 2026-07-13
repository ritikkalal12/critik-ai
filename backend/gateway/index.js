import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Gateway server is running' });
});

app.listen(port, () => {
  console.log(`Gateway server is running on port ${port}`);
});
