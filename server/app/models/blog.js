const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Blog', new Schema({
    title: { type: String },
    body: { type: String },
    introduce: { type: String },
    category: { type: String },

    thumb: { type: Number, default: 0 },
    comment: { type: Array, default: [] },

    date: { type: Date }
}, {
    collection: 'Blog'
}))