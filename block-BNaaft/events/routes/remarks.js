var express = require('express');
var router = express.Router();
var Event = require("../models/event")
var Remark = require("../models/remark")

router.get('/:id/commentedit', (req, res) => {
    var id = req.params.id;
    Remark.findById(id, (err, comment) => {
        if (err) return next(err);
        res.render('remarkEdit', { data:comment })
    })
})

router.post('/:id/commentedit' , (req, res, next)=> {
    Remark.findByIdAndUpdate(req.params.id , req.body , {new:true} , (err, comment)=> {
        if(err) return next(err);
        res.redirect('/events/' + comment.events);
    })
})


router.get('/:id/commentdelete', (req,res, next)=>{
  var remarkId =   req.params.id;
  Remark.findByIdAndRemove(remarkId, (err, comment)=>{
      if(err) return next(err);
      res.redirect('/events/'  + comment.events)
  })
})

router.get('/:id/commentlike', (req,res, next)=>{
    let id = req.params.id;
    console.log(req);
    Remark.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, comment) => {
        res.redirect('/events/'  + comment.events );
    })
  })

  
  router.get('/:id/commentDislike', (req,res, next)=>{
    let id = req.params.id;
    console.log(req);
    Remark.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, comment) => {
        res.redirect('/events/'  + comment.events );
    })
  })
  

module.exports = router;