// first include express
const express = require('express');

// create router
const router= express.Router();


// conect with model schema
const Student = require('../model/student')

//connect mongo 
const mongoose=require('mongoose');
const student = require('../model/student');
// check suth include in student route
const checkauth = require('../middleware/check-auth')


// get req = data return 
// dlt req = data dlt 
// put req = data delete 


router.get('/',checkauth,(req,res,next)=>{
    // res.status(200).json({
        // msg:"this is student get req ....."
    // })
    Student.find()
    .then(result=>{
        res.status(200).json({
            studentData:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    

})



// making another get to get all elements  via unique id 
router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})



//lets delete some data 

// router.delete('/:id',(req,res,next)=>{
//     // console.log(req.params.id);
//     Student.remove({_id:req.params.id})
//     .then(result=>{
//         res.status(200).json({
//             message:'product deleted',
//             result:result
//         })
//     })
//     .catch(err=>{
//         res.status(500).json({
//             error:err
//         })
//     })
// })

router.delete('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findOneAndDelete({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'product delted',
            student:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
})


//put 

// router.put('/:id',(req,res,next)=>{
    // console.log(req.params.id);
    // Student.findOneAndUpdate({_id:req.params.id},{
        // $set:
        // {
// 
            // copied from post ..
        //    _id:new mongoose.Types.ObjectId,
            // NAME: req.body.NAME, // .NAME must be same with how we include in front end means postman 
            // GENDER:req.body.GENDER,
            // ROLLNO:req.body.ROLLNO ,
            // EMAIL: req.body.EMAIL 
        // }
    // })
    // .then(result=>{
        // res.status(200).json({
            // message:"updated database ",
            // updated_data:result
        // })
    // })
    // .catch(err=>{
        // console.log(err)
        // res.status(500).json({
// 
            // message:"updatation failed",
            // error:err
        // })
    // })
// 
// })

router.put('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            NAME:req.body.NAME,
            EMAIL:req.body.EMAIL,
            ROLLNO:req.body.ROLLNO,
            GENDER:req.body.GENDER
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})




router.post('/',(req,res,next)=>{
    //body te jaja dhukbe ta console kore dekhe nilam 
   // console.log(req.body)


//    new variable create 
   const student=new Student ({
 _id:new mongoose.Types.ObjectId,
 NAME: req.body.NAME, // .NAME must be same with how we include in front end means postman 
 GENDER:req.body.GENDER,
 ROLLNO:req.body.ROLLNO ,
 EMAIL: req.body.EMAIL 
   })
    // have to save the data 
student.save()
.then(result=>{
    console.log(result);
    res.status(200).json({
        newStudent:result
    })
    // agar aisa nehi hua then error 
.catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
})
})

    // res.status(200).json({
    //     msg:"this is student post req ....."
    // })
})








// export thus we will use it in app
module.exports=router;