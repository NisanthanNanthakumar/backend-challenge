module.exports = (req, res, next) => {
  const { sender, message, conversation_id } = req.body;

  // Validation logic
  // 'sender' and 'message' fields will be validated by Mongoose

  if (!conversation_id) {
    return res.status(400).send({
      message: "Bad Request",
      description: "'conversation_id' property is required."
    });
  }

  next();
};
