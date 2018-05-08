
//import express modules

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var winston = require('winston');

var database = require('../config/database');
var College = require('../models/collegedetails');



//connecting database
mongoose.connect(database.url, function(err,db)

{
  if(db)
  console.log("connected");
});
/* GET home page. */
//router.get('/', function(req, res, next) {
  //res.render('index', { title: 'college details' });
//});

//creating a log file
winston.add(
  winston.transports.File, {
    filename: 'studentinformation.log',
    level: 'info',
    json: true,
    eol: 'rn',
    timestamp: true
  }
)
winston.log('info',"check your data..")



//fetching data from database
router.get('/', function(req, res, next) {

  winston.log('info',"check your data..")

  College.find({},function (err, item) {
          if (err){
        //   res.send('err');
           res.status(500).json({ error: error.toString() }).catch(next);
         }

  else{
   res.status(200).send(item);
  console.log(item);
}

}).catch(next);
});

 

// create a put  method to update a existing record into collection
router.put('/api/student/:student_id', function(req, res) {



 var id = req.params.student_id;
 var data = {
   clgname:req.body.clgname,
   clgcode:req.body.clgcode,
   clgaddress:req.body.clgaddress,
   phno:req.body.phno,
   emailid:req.body.emailid,
   cname:req.body.cname,
   cnumber:req.body.cnumber

 }
 College.findByIdAndUpdate(id, data, function(err, collegedetails) {
 if (err)
 res.status(500).json();
else{

 res.status(202).send("Successfully! student updated - ");
}
 });
});

//delete a record in collection based on paricular id
 router.delete('/api/student/:_id', function(req, res) {

  console.log(req.params._id);
  var id = req.params._id;
  College.remove({
  _id : id
  }, function(err) {
  if (err)
  res.status(500);
  else
   res.status(202).send("Successfully! student deleted - ");
 })
 });




//record inserting by post method
router.post('/insert', function(req, res) {
  var college=new College({
  clgname:req.body.clgname,
//  clgcode:req.body.clgcode,
  clgaddress:req.body.clgaddress,
  phno:req.body.phno,
  emailid:req.body.emailid,
  cname:req.body.cname,
  cnumber:req.body.cnumber

})
college.save(function (err, item) {
        if (err){
         res.status(500);
       }else {


     College.count({}, function( err, count){

       var sc="B"+count++;
       College.findOneAndUpdate({clgcode:sc.clgcode}, {clgcode:sc}, {upsert:true}, function(err, doc){
   if (err) return res.send(500, { error: err });
   return res.send("succesfully saved");
});

})

   }
   function getNextSequenceValue(sequenceName){

     var sequenceDocument = db.counters.findOneAndUpdate(
       { "_id" : sequenceName },
        { $inc : { sequence_value : 1 } },
        { new : true }
      );
  return sequenceDocument.sequence_value;
}

 })

})

module.exports = router;
