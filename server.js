/* Empty JS object to act as endpoint for all routes */
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app                                   
const app = express();

// Cors for cross origin allowance
const cors = require('cors');
//start up cors
app.use(cors());
/* Dependencies */
//run body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// /* Empty JS object to act as endpoint for all routes */
// let projectData = {};

/* Initializing the main project folder */
app.use(express.static('website'));
// Setup Server
//number port of server that we will use
const port = 7002;
//to turn on the server 
const server = app.listen(port, listening);
//callback function
function listening(){
     console.log(server);
    console.log(`running on localhost: ${port}`);
}

 //request type=>get ||callback arrowfunction------------------------

 const coollectAll = (req,res) =>{
     projectData = req.body;
     console.log(projectData);
     res.send(projectData);
 }
 app.get("/all", (req, res) =>{
    res.send(projectData);
  })
  //request type=>post ||callback arrowfunction

const dataPost = (req,res) =>{
    projectData = req.body;
    console.log(req.body)
    projectData.date=req.body.date;
    projectData.temp=req.body.temp;
    projectData.content=req.body.content;
    res.send({msg:"Done"})
}

  app.post("/add", (req, res) =>{
    projectData = req.body;
    res.send(projectData);
  })