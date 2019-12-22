const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Draft', new Schema({
    title: { type: String },
    body: { type: String },
    introduce: { type: String },
    category: { type: String },

    date: { type: Date }
}, {
    collection: 'Draft'
}))