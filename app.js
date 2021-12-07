const express = require('express');
const app = express();
const ejs = require("ejs");


const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render("index");
});

const predictRouter = require('./routes/predict');
app.get('/Predict', (req,res) =>{
  res.render("predict");
});


app.post('/result', (req,res) =>{

  console.log(req.body)  
  //Initialize data
  var data = [2349,18,1,0,0,0,0,0,1,1232,2,474,59,2107.05,2821.34,3213.44,4447.45,0.11,7.44,714.4,1094.09,2402.62,3260.58]
  data = JSON.stringify(data);
  var spawn = require('child_process').spawn;
  var process = spawn('C:Users/prateek/anaconda3/envs/py37/python', ['E:/VIT/Sem 7/Tarp/Project/routes/predict.py', data]);

   var predictedData;
  process.stdout.on('data', function (data) {
      predictedData = data.toString();
  });

  process.stdout.on('end', function (data) {
      res.render("result",{predictedData:predictedData});
});


  process.stderr.on('data', function (data) {
    console.log(data.toString());
});

});


PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Running server at http://localhost:${PORT}`);
