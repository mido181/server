const ErrorRes = require("../utils/Error");
const globalErrorHandle = (err,req, res, next) => {
  let error = { ...err };
  error.message = err.massage;

  if (err.name === "CastError") {
    const message = "لا يوجد هذا ال ID لدينا";
    error = new ErrorRes(404, message);
  }
  if (err.code === 11000) {
    const message = "من فضلك ادخل البيانات بشكل صحيح";
    error = new ErrorRes(400, message);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val=>val.message);
    error = new ErrorRes(400, message);
  }
  const serverErrorMsg = "خطأ في السيرفر نرجو المحاولة في وقت لاحق";
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || err.message ,errorStack: err.stack });
};


module.exports = globalErrorHandle 
