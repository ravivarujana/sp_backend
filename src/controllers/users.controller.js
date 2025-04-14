import { asyncHandler } from "../utils/asyncHandler.js";

/* We need to pass a callback to our route handler, so the business login habdled for a specific route is written here */
// const registerUser = (req, res) => {
//   res.status(200).json({
//     message: "ok",
//   });
// };

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Success",
  });
});
export { registerUser };
