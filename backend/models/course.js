var mongoose= require("mongoose");


//create book model
let CourseSchema = new  mongoose.Schema(
    {
       //{ code: 1, name: "Emerging Technologies", section: 3, semester: 2 },
        code:{type: String, required: true},
        name: {type: String, required: true},
        section: {type: Number, required: true},
        semester:{type: Number, required: true},
    },
    {
        timestamps:true
    }
);



module.exports = mongoose.model('Course', CourseSchema);