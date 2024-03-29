require('dotenv').config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection(process.env.MONGODB_URI);
autoIncrement.initialize(connection);
const allExamsSchema = new Schema({
  exam: {
    type: Schema.Types.ObjectId,
    required: true,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['prostateExams', 'liverExams']
  },
  pacient: {type: Schema.Types.ObjectId, required: true, ref: 'pacients'},
  examId: Number,
  state:{
    type:String,
    enum: ['done', 'not done'],
    default: "not done"
  }
},{timestamps: true});
allExamsSchema.plugin(autoIncrement.plugin, { model: 'allexams', field: 'examId' });
const AllExams = mongoose.model("allexams", allExamsSchema);
module.exports = AllExams;