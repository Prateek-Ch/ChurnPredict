const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
   res.render('predict')    
});

router.post('/',function(req,res){
   console.log(req.body)
   var a = parseInt(req.body.vintage)	
   var b = parseInt(req.body.age)	
   var c = req.body.Gender	
   var d = parseInt(req.body.dependents)	
   var e = req.body.occupation	
   var f = parseInt(req.body.city)	
   var g = parseInt(req.body.customer_nw_category)	
   var h = parseInt(req.body.branch_code)	
   var i = parseInt(req.body.last_transaction)	
   var j = parseFloat(req.body.current_balance)	
   var k = parseFloat(req.body.previous_month_end_balance)	
   var l = parseFloat(req.body.average_monthly_balance_prevQ)	
   var m = parseFloat(req.body.average_monthly_balance_prevQ2)	
   var n = parseFloat(req.body.current_month_credit)
   var o = parseFloat(req.body.previous_month_credit)	
   var p = parseFloat(req.body.current_month_debit)
   var q = parseFloat(req.body.previous_month_debit)	
   var r = parseFloat(req.body.current_month_balance)	
   var s = parseFloat(req.body.previous_month_balance)

   if(c.localeCompare("Male")==0){
      c = 1
   }
   else{
      c = 0
   }
   
   var e1,e2,e3,e4;
   if(e.localeCompare("retired")==0){
      e1 = 1;
      e2 = 0; e3 = 0;e4 = 0;
   }
   else if(e.localeCompare("salaried")==0){
      e2 = 1;
      e1=0;e3=0;e4 = 0;
   }
   else if(e.localeCompare("self-employed")==0){
      e3 = 1;
      e1=0;e2=0;e4 = 0;
   }
   else if(e.localeCompare("student")==0){
      e4 = 1;
      e1=0;e3=0;e2 = 0;
   }
   var arr = [c,f,h,i,0,e1,e2,e3,e4,g,j,k,m,l,n,o,p,q,r,s,a,b,d]
   console.log("arr",arr)

   // var data = [2349,18,1,0,0,0,0,0,1,1232,2,474,59,2107.05,2821.34,3213.44,4447.45,0.11,7.44,714.4,1094.09,2402.62,3260.58]
   // console.log("data",data)
   arr = JSON.stringify(arr);
   var spawn = require('child_process').spawn;
   var process = spawn('C:Users/prateek/anaconda3/envs/py37/python', ['E:/VIT/Sem 7/Tarp/Project/routes/predict.py', arr]);

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

module.exports = router;
