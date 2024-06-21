const handleSuccess = (res, message, data) => {
  res.send({
    status: "success",
    message,
    data
  });
  res.end();
}
module.exports = handleSuccess;
