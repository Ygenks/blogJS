const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/frontcampblog');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    body: String
});



module.exports = mongoose.model('Blog', BlogSchema);
