var express = require('express');
var router = express.Router();
var Assignments = require('../models/assignments.js');

/* GET users listing. */
router.get('/:assignment_name?', function(req, res, next) {
  var search = {};
  if(req.params.assignment_name) {
    search.assignment_name = req.params.assignment_name;
  }
  Assignments.find(search, function (err, assignment) {
    if(err) {
      console.log(err);
      next(err);
    }else {
      res.render('index', {assignments: assignment});
    }
  });
  //res.send('respond with a resource');
});

router.post('/', function(req, res, next){
var assignment = new Assignments(req.body);
 console.log(assignment);
  res.status(200, function(err) {
    if(err){
      console.log(err, 'errrrrrrroooor');
      throw err;
    }
  });
  assignment.save(function(err){
   if (err){
     console.log(err);
   }

  });
  res.send(JSON.stringify(assignment));
});

module.exports = router;
