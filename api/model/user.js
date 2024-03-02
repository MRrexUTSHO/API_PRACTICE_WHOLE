// mongoogoose connection 
const mongoose = require('mongoose');





//schema creating -------> 


const userSchema = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId ,
    username:String,
    password:String,
    email:String,
    phone:Number,
    userType:String
    
})








// have to export 
module.exports= mongoose.model('user',userSchema);

