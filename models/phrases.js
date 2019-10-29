const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phrasesSchema = new Schema({
  phrases: Array
});

const Phrases = mongoose.model('phrases', phrasesSchema);
module.exports = Phrases;