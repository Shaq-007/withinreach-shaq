const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(process.env.PORT || 3000, () => console.log('listening at ${process.env.PORT}'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database1 = new Datastore('database1.db');
database1.loadDatabase();

app.get('/api', (request, response) => {
  database1.find({}).sort({ timestamp: -1 }).limit(1).exec(function (err, data) {
    if (err) {
      response.end();
      return;
    }
      response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database1.insert(data);
  response.json(data);
});

const database2 = new Datastore('database2.db');
database2.loadDatabase();

app.get('/api2', (request, response) => {
  database2.find({}).sort({ timestamp: -1 }).limit(1).exec(function (err, data2) {
    if (err) {
      response.end();
      return;
    }
      response.json(data2);
  });
});

app.post('/api2', (request, response) => {
  const data2 = request.body;
  const timestamp = Date.now();
  data2.timestamp = timestamp;
  database2.insert(data2);
  response.json(data2);
});