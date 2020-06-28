const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Profile = new Schema({
    firstName: {
        type: String
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String
    }
});

module.exports = mongoose.model('userProfile', Profile);