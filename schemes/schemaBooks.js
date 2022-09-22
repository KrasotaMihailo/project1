const mongoose = require("mongoose")

const SchemaBooks = mongoose.Schema({
    title: String,
    description: String,
    authorId: String,
    rating: Number
})

module.exports = mongoose.model("schemaBooks", SchemaBooks)