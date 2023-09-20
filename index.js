var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
var multer  = require("multer");


var app = Express();
app.use(cors());

var CONNECTION_STRING = 'mongodb+srv://vinnathninura:acerlaptop123@cluster0.c2uw1rv.mongodb.net/?retryWrites=true&w=majority'


var DATABASENAME = "TODODB"
var database;

app.listen(3000, ()=>{
  Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
    database=client.db(DATABASENAME);
    console.log('connected !!');
  })
})