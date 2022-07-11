const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    caseid: String,
    message: String,
    counseleeid: String,
    counselerid: String,
    threaddate: String,
    status: String
});

const Thread = mongoose.model('Thread',ThreadSchema);

module.exports = Thread;