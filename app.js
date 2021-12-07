const express = require('express');
const app = express();
const ejs = require("ejs");

const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render("index");
});

var predictRouter = require('./routes/predict');


app.use('/Predict',predictRouter);


PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Running server at http://localhost:${PORT}`);
