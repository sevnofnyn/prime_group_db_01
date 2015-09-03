var express = require('express');
var router = express.Router();
var Assignments = require('../models/assignments.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("index.js get");
  var search = {};
  Assignments.find(search, function (err, assignment) {
    if(err) {
      console.log(err);
      res.send("error");
      next(err);
    }else {
      res.render('index', {assignments: assignment});
    }
  });
  //var assignment = [{assignment_name: "Prime Group DB 01", student_identity: "Bob",
  //  score: 0, date_completed: "9/3/2015"}, {assignment_name: "Fruit Stand", student_identity: "Bob", score: 5, date_completed: "9/2/2015"}];
  //console.log(assignment);
  //res.render('index', {assignments: assignment});

  //['Prime Group DB 01', 'Fruit Stand','Toastmasters', 'Salary Calculator', 'Assessment 1', 'Daily Check-in'] });
  //res.render('assignments', { assignment_name: ['Prime Group DB 01', 'Fruit Stand','Toastmasters', 'Salary Calculator', 'Assessment 1', 'Daily Check-in'] });
});

module.exports = router;
