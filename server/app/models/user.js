const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    account: { type: String, unique: true },
    password: { type: String }
}, {
    collection: 'User'
}))