const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Blog', new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    introduce: { type: String, required: true },
    category: { type: String, required: true },

    thumb: { type: Number, default: 0 },
    comment: { type: Array, default: [] },

    date: { type: Date }
}, {
    collection: 'Blog'
}))