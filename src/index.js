require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './router';

const app = express();
app.use(bodyParser.json({ type: '*/*' }));

const entries = [
  {
    task: 'write code',
    id: 1,
    project: 2,
    starttime: new Date('October 20, 2019 13:00:00'),
    endtime: new Date('October 20, 2019 13:30:00'),
    user: 1,
  },
  {
    task: 'refactor code',
    id: 2,
    project: 2,
    starttime: new Date('October 20, 2019 14:00:00'),
    endtime: new Date('October 20, 2019 14:30:00'),
    user: 1,
  }
]

app.get('/entries', (req, res) => {
  res.status(200).send(entries)
});

app.get('/entries/:id', (req, res) => {
  const entry = entries.find(el => el.id.toString() === req.params.id);
  res.send(entry)
});

router(app);

mongoose.connect(process.env.MONGODB_URI, () => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });
});
