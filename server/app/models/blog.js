const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Blog', new Schema({
    title: { type: String, required },
    body: { type: String, required },
    introduce: { type: String, required },
    category: { type: String, required },

    thumb: { type: Number, default: 0 },
    comment: { type: Array, default: [] },

    date: { type: Date }
}, {
    collection: 'Blog'
}))