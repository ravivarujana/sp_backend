import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

/* We need to pass a callback to our route handler, so the business login habdled for a specific route is written here */
// const registerUser = (req, res) => {
//   res.status(200).json({
//     message: "ok",
//   });
// };

const registerUser = asyncHandler(async (req, res) => {
  /* Check Request Body */
  if (!Object.keys(req.body).length) {
    throw new ApiError(400, "Empty request body");
  }

  const { username, email, fullName, password } = req.body;

  if (
    [username, email, fullName, password].some((value) => value?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  /* Check the db methods - find if the user already exists*/
  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  console.log("IS USER EXISTS ===== ", isUserExist);

  if (isUserExist) {
    throw new ApiError(409, "User already exists");
  }

  // const {avatar, coverImage} = req.files;
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is not present");
  }

  const uploadAvatar = await uploadOnCloudinary(avatarLocalPath);
  const uploadCoverImage = await uploadOnCloudinary(coverImageLocalPath);

  console.log("UPLOAD AVATAR ON CLAUDINARY  +++++++++++ ", uploadAvatar);

  /* What error code should be there as this is third party service */
  if (!uploadAvatar) {
    throw new ApiError(400, "Avatar image is not present");
  }

  const createUser = await User.create({
    fullName,
    avatar: uploadAvatar?.url,
    email,
    password,
    username: username.trim().toLowerCase(),
    coverImage: uploadCoverImage?.url || "",
  });

  /* Making extra DB call to check if user has been successfully added to DB */
  /* Select query here bydefault have all the fields selected, to not consider few fields user - sign as prefix inside string */
  const userCreated = await User.findById(createUser._id).select(
    "-password -refreshToken"
  );

  if (!userCreated) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userCreated, "User successfully registered"));
});
export { registerUser };
