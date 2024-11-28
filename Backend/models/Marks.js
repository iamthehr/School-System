const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  subject: { type: String, required: true },
  marks: { type: Number, required: true },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Marks", marksSchema);
