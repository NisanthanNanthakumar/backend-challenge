exports.handleError = (err, res) => {
  res.status(400).send({
    message: "Bad Request",
    description: err
  });
};
