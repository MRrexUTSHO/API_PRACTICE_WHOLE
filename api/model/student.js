// mongoogoose connection 
const mongoose = require('mongoose');





//schema creating -------> 


// abar je type er data ami dhokachchi .. seta show korate hobe 
const studentSchema = new mongoose.Schema({
    // unique id for every fucking student
    _id:mongoose.Schema.Types.ObjectId,
    //postman a jaja debo 
    NAME: String,
    GENDER:String ,
    ROLLNO:Number ,
    EMAIL: String
})








// have to export 
module.exports= mongoose.model('Student',studentSchema);

