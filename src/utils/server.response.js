class ServerResponse {
  static HTTP_STATUS = {
    SUCCESS: { code: 200, message: 'OK' },
    INTERNAL_ERROR: { code: 500, message: 'Internal server error' },
    NOT_FOUND: { code: 404, message: 'Not Found' },
    BAD_REQUEST: { code: 400, message: 'Bad Reques' },
  };

  static success(res, data) {
    return res.status(this.HTTP_STATUS.SUCCESS.code).send({ status: this.HTTP_STATUS.SUCCESS.code, message: this.HTTP_STATUS.SUCCESS.message, data });
  }

  static internalError(res, error) {
    return res.status(this.HTTP_STATUS.INTERNAL_ERROR.code).json({
      status: this.HTTP_STATUS.INTERNAL_ERROR.code,
      message: this.HTTP_STATUS.INTERNAL_ERROR.message,
      error,
    });
  }
  static notFound(res) {
    return res.status(ServerResponse.HTTP_STATUS.NOT_FOUND.code).json({
      status: ServerResponse.HTTP_STATUS.NOT_FOUND.code,
      message: ServerResponse.HTTP_STATUS.NOT_FOUND.message,
    });
  }
  static badRequest(res, error) {
    return res.status(ServerResponse.HTTP_STATUS.BAD_REQUEST.code).json({
      status: ServerResponse.HTTP_STATUS.BAD_REQUEST.code,
      message: ServerResponse.HTTP_STATUS.BAD_REQUEST.message,
      error,
    });
  }
}

export { ServerResponse };
