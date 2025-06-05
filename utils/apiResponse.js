class ApiResponse {
  constructor(res, statusCode, data, message = 'Success') {
    res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }
}

module.exports = ApiResponse;