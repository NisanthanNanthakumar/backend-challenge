const mongoose = require("mongoose");
const { Schema } = mongoose;
const MessageSchema = require("./Message");

const conversationSchema = new Schema({
  messages: [MessageSchema]
});

// transform _id field to id
conversationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {  delete ret._id  }
});


mongoose.model("conversations", conversationSchema);
