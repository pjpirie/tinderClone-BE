const { Schema } = require("mongoose");
const mongoose = require('mongoose');

const cardSchema = new Schema({
    name: String,
    imgUrl: String
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;