const {constants} = require('../constants')

const errorHandler = (error, req, res, next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation failed",
                message: error.message,
                stackTrace: error.stack
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: error.message,
                stackTrace: error.stack
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Un authorized",
                message: error.message,
                stackTrace: error.stack
            })
            break;
        case constants.FORBIDDEN:
            res.json({
            title: "Forbidden",
            message: error.message,
            stackTrace: error.stack
            })
            break;
        case constants.SERVER_ERROR:
            res.json({
            title: "Server Error",
            message: error.message,
            stackTrace: error.stack
            })
            break;
        default:
            console.log("No Error All Good")
            break;
    }
    
    
}

module.exports = errorHandler