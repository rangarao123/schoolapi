var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmpSchema = new Schema({
  clgname :String,
  clgcode:String,
  clgaddress:String,
  phno:String,
  emailid:String,
  contactname:String,
  contactnumber:String

});
module.exports = mongoose.model('collegedetails', EmpSchema);
