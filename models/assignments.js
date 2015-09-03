var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({

    assignment_name: {type: String, required: true},
    student_identity: {type: String, required: true},
    score: Number,
    date_completed: {type: Date, required: true}
});
var Assignment= mongoose.model('Assignment', assignmentSchema);

module.exports= Assignment;
