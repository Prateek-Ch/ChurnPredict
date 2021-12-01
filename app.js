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
app.use('/predict', predictRouter);

app.get('/result', (req,res) =>{
  
    //Initialize data
    const data = {
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }

    //Stringify data
    let stringifiedData = JSON.stringify(data);

  var spawn = require('child_process').spawn;
  var process = spawn('C:Users/prateek/anaconda3/envs/py37/python', ['E:/VIT/Sem 7/Tarp/Project/routes/predict.py', stringifiedData]);

  process.stdout.on('data', function (data) {
      global.predictedData = data.toString();
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
