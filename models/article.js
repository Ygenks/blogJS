const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: String,
    body: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);
