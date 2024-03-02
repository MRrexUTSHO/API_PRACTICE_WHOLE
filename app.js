const express = require('express');
// je express ta install holo seta k include korlam app a 

const app = express();
//creating app



// body perser include
const bodyParser=require('body-parser')
//using body perser 
// note .. it must be before routes .. (routs=student , faculty )
app.use(bodyParser.urlencoded({extended:false}));
//data dite hobe json a 
app.use(bodyParser.json())






   // path include for user 
   const userRoute = require('./api/routes/user')
   app.use('/user',userRoute);
   // jokhon e keu /student hit korbe poc kore chole jabe student route a 



   // path include for student 
const studentRoute = require('./api/routes/student')
app.use('/student',studentRoute)
// jokhon e keu /student hit korbe poc kore chole jabe student route a 

const facultyRoute = require('./api/routes/faculty')
app.use('/faculty',facultyRoute)


// include mongoose 
const mongoose = require('mongoose');

// connect
mongoose.connect('mongodb+srv://UTSHO:utsho1234@utshodutta.e8szrqc.mongodb.net/?retryWrites=true&w=majority&appName=UtshoDutta')

//connect holo kina chking 
mongoose.connection.on('error',err=>{
    console.log('connection failed with mongoose');
})

mongoose.connection.on('connected',connected=>{
    console.log("connected with database mongoose...")
})







// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:"App is running"
//     })
// })
//
//
// notes 
// middle wire app.use(...) include korlam 
// its an arrow function 
// as result 200 = signal green all okey .. 
// then include json file 
// where we can send a message like app is running 








// if wroung route ..jeta deya nei ..seta call kora hoy = 
// then it is error helding ... 
app.use((req,res,next)=>{
    res.status(404).json({
        error:"url not found ..."
    })
})






// abar jate onno jaygay use korte pare .. have to export itt 
module.exports = app ;

// aei app take server a host kortre hobe 