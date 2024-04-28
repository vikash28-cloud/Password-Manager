const express = require('express');

const {MongoClient} = require("mongodb")
const mongoose = require('mongoose');
const bodyParser =require ("body-parser");
const pkg =require("cors");
const app = express()
const port = 3000
const configDotenv =require("dotenv");
configDotenv.config();
// console.log(process.env.MONGO_URI);  //CHECKING DOTENV
const MONGO_URL = process.env.MONGO_URL;

app.use(bodyParser.json())
app.use(pkg())


const url = 'mongodb://127.0.0.1:27017/password-manager';
const client = new MongoClient(url);

// Database Name
const dbName = 'passwordManagerDB';


mongoose.connect(MONGO_URL);
mongoose.connection.on('connected', ()=>{
  console.log('Connected to MongoDB');
})

mongoose.connection.on('error', (err)=>{
  console.log('Error occurred while connecting',err);
})

require('./models/user_model');
require('./models/password_model');

app.use(require('./routes/user_route'));
app.use(require('./routes/passwords_route'));



mongoose.connect(MONGO_URL);
mongoose.connection.on('connected', ()=>{
  console.log('Connected to MongoDB');
})

mongoose.connection.on('error', (err)=>{
  console.log('Error occurred while connecting',err);
})

require('./models/user_model');
require('./models/password_model');

app.use(require('./routes/user_route'));
app.use(require('./routes/passwords_route'));


// get all the passwords
// app.get('/', async(req, res) => {
//   const db = client.db(dbName)
//   const collection = db.collection("passwords");
//   const findResult = await collection.find({}).toArray();
//   res.json(findResult)
  
// })

// save a password

// app.post('/', async(req, res) => {
//   const password = req.body;
//   const db = client.db(dbName)
//   const collection = db.collection("passwords");
//   const findResult = await collection.insertOne(password);
//   res.send({success:true,result:findResult})
// })

// delete a password
// app.delete('/', async(req, res) => {
//   const password = req.body;
//   const db = client.db(dbName)
//   const collection = db.collection("passwords");
//   const findResult = await collection.deleteOne(password);
//   res.send({success:true,result:findResult})
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})