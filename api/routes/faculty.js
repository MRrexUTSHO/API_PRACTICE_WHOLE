const express = require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        msg:"faculty get ......"
    })
})
router.post('/',(req,res,next)=>{
    res.status(200).json({
        msg:"faculty post ......"
    })
})


module.exports=router;