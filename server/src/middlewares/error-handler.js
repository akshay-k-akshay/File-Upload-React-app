const { StatusCodes } = require("http-status-codes");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError
} = require("../errors");
const { logger } = require("../config/winston");

function errorHandler(error, req, res, next) {
  switch (error.constructor) {
    case NotFoundError:
      return res.status(StatusCodes.NOT_FOUND).json({
        message: error.message,
        statusCode: StatusCodes.NOT_FOUND
      });

    case BadRequestError:
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST
      });

    case UnauthorizedError:
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: error.message,
        statusCode: StatusCodes.UNAUTHORIZED
      });

    default:
      logger.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR
      });
  }

  next();
}
module.exports = {
  errorHandler
};
