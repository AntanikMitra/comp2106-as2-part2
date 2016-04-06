// link to mongoose
var mongoose = require('mongoose');

// define the article schema
var directorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Name cannot be blank'
    },
   
   table: {
       type: String,
       default: '',
       required: 'table cannot be empty'
   },
   
   floor: {
        type: String,
        default: '',
        required: 'Table number is needed'
    }
});

// make it public
module.exports = mongoose.model('directorys', directorySchema);
