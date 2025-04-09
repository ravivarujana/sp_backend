/* Creating a wrapper to work with async operation like working with  dbqueries */
// function asyncHandler(fn) {
//   return async (req, res, next) => {
//     try {
//       await fn(req, res, next);
//     } catch (err) {
//       res.status(err.code || 500).json({
//         success: false,
//       });
//     }
//   };
// }

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (err) {
//     res.status(err.code || 500).json({
//       success: false,
//     });
//   }
// };

const asyncHandler = (requestHandler) => {
  // return new Promise
  (req, res, next) => {
    Promise.resolve(requestHandler(res, req, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
