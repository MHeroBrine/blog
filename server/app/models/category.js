const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Category', new Schema({
    title: { type: String }
}, {
    collection: 'Category'
}))