const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  public_id: String,
  freePreview: Boolean,
});

const courseSchema = new mongoose.Schema({
    instuctorId: String,
    instuctorName:String,
    date: String,
    title: String,
    category: String,
    level: String,
    primaryLanguage: String,
    subtitle: String,
    description: String,
    image: String,
    welcomeMessage: String,
    pricing: Number,
    objectives: String,
    student: [
        {
            studentId: String,
            studentName: String,
            studentEmail: String,
            
        }
    ],
    curriculum: [LectureSchema],
    isPublised:Boolean 
})

module.exports = mongoose.model("Course", courseSchema);