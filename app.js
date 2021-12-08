const express = require('express');
const app = express();
const ejs = require("ejs");

const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



var predictRouter = require('./routes/predict');
var aboutRouter = require('./routes/about');
var indexRouter = require('./routes/index');


app.use('/predict',predictRouter);
app.use('/about',aboutRouter);
app.use('/',indexRouter);



PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Running server at http://localhost:${PORT}`);
