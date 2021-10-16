const ErrorResponse = require('../utlis/ErrorResponse');
const errorHandler = (err, req, res, next) => {
    let error = {...err}; // making a soft copy
    error.message = err.message;

    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value} `
        error = new ErrorResponse(message, 404)
    }



    res.status(error.statusCode || 500).json({
        status: false,
        error: error.message || `server Error`
    })
};

module.exports = errorHandler;