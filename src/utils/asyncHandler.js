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

/* Function -> callbkac is passed ->  */
/* returns a async asynonymus callback/ a new middleware */


/* If a asyc code throws an error, express doesn't handle it directly so we need the catch block */

const asyncHandler =
  (requestHandler) =>
  // return new Promise

  (req, res, next) => {
    console.log("Comming inside the async handler");
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
export { asyncHandler };
