const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CaseSchema = new Schema({
    title: String,
    description: String,
    counseleeid: String,
    counselerid: String,
    casedate: String,
    status: String,
    thread: [String]
});

const Case = mongoose.model('Case',CaseSchema);

module.exports = Case;