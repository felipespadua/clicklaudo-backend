const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phrasesSchema = new Schema({
  observations: Object,
  conclusions: Object,
  exam: String
});

const Phrases = mongoose.model('phrases', phrasesSchema);
module.exports = Phrases;