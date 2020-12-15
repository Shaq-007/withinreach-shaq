const express = require('express');
const Datastore = require('nedb');

const app = express();

app.listen(process.env.PORT || 3000, ()=> {console.log(`app is running on port ${process.env.PORT}`)})
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// Creating new user names & password into databse file

const userList = new Datastore('userList.db')
userList.loadDatabase()

app.get('/users', (req, res) => {    //for getting user list at front end
    userList.find({}, function (err, docs){
    console.log(docs);
    let users = docs.map((user) => user.name)
    res.send(users)
    // res.send(docs)
  })
 })
app.post('/users', (req, res) =>{
  const user = {name: req.body.name, password: req.body.password, restaurant: req.body.restaurant}
  console.log(req.body)
  console.log(user)
  userList.insert(user)
  res.status(201).send()
})

app.post('/login', (req, res) => {
  const user = {name: req.body.name, password: req.body.password }
  userList.findOne({name: user.name}, function(err, docs){
    if (docs){
        if (docs.password === user.password){
          res.send(["Login Successfull", docs.restaurant])
        }
        else {
          res.send(["incorrect password"])
        }
    }
    else{
      res.send(["Invalid Username"])
    }
    
  })
})
    // database construction for locations seat & time data //
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

const database3 = new Datastore('database3.db');
database3.loadDatabase();

app.get('/api3', (request, response) => {
  database3.find({}).sort({ timestamp: -1 }).limit(1).exec(function (err, data3) {
    if (err) {
      response.end();
      return;
    }
      response.json(data3);
  });
});

app.post('/api3', (request, response) => {
  const data3 = request.body;
  const timestamp = Date.now();
  data3.timestamp = timestamp;
  database3.insert(data3);
  response.json(data3);
});