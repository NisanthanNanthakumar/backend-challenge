const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: {
    type: String,
    required: [true, "'sender' property is required."]
  },
  message: {
    type: String,
    required: [true, "'message' property is required."]
  },
  created: {
    type: Date,
    default: Date.now
  },
  _id: false,
});

module.exports = messageSchema;
