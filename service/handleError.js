const handleError = (res, message) => {
    res.status(400).send({
        status: "false",
        message
    }).end();
}

module.exports = handleError;