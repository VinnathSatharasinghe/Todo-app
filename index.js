var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
var multer  = require("multer");


var app = Express();
app.use(cors());

var CONNECTION_STRING = 'mongodb+srv://vinnathninura:acerlaptop123@cluster0.c2uw1rv.mongodb.net/?retryWrites=true&w=majority'


var DATABASENAME = "TODODB"
var database;

app.listen(5030, ()=>{
  Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
    database=client.db(DATABASENAME);
    console.log('connected !!');
  });
})

app.get('/TODO_APP/gg/GetNotes',(request,response)=>{
  database.collection("todoappcollection").find({}).toArray((error,result)=>{
    response.send(result);
  });
})

app.post('/TODO_APP/gg/AddNotes',multer().none(),(request,response)=>{
  database.collection("todoappcollection").count({},function(error,numOfDocs){
    database.collection("todoappcollection").insertOne({
      id:(numOfDocs+1).toString(),
      description:request.body.newNotes
    });
    response.json("Added Succesfully");
  })
})

app.delete('TODO_APP/gg/DeleteNotes',(request,response)=>{
  database.collection("todoappcollection").deleteOne({
    id:request.query.id()
  });
  response.json("Deleted Succesfully");

})

