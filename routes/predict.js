const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
   res.render('predict')    
});

router.post('/',function(req,res){
   console.log(req.body)
   var a = req.body.vintage	
   var b = req.body.age	
   var c = req.body.Gender	
   var d = req.body.dependents	
   var e = req.body.occupation	
   var f = req.body.city	
   var g = req.body.customer_nw_category	
   var h = req.body.branch_code	
   var i = req.body.days_since_last_transaction	
   var j = req.body.current_balance	
   var k = req.body.previous_month_end_balance	
   var l = req.body.average_monthly_balance_prevQ	
   var m = req.body.average_monthly_balance_prevQ2	
   var n = req.body.current_month_credit	
   var o = req.body.previous_month_credit	
   var p = req.body.current_month_debit	
   var q = req.body.previous_month_debit	
   var r = req.body.current_month_balance	
   var s = req.body.previous_month_balance

   console.log(c);
   console.log(req.body.occupation)

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
   var arr = [a,b,c,d,0,e1,e2,e3,e4,f,g,h,i,j,k,l,m,n,o,p,q,r,s]
   console.log(arr)

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

module.exports = router;
