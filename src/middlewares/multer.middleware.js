import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    /*  */
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    /* We can save the file in the temp storage on the server with any name we want */
    // default code from multer
    // cb(null, file.fieldname + "-" + uniqueSuffix);

    /* We are keeping the original name of the file while saving it temporarily on the server - though having the same name would also mean that file will get override - but since we are performing cloud upload option instantly and unlinking the file on the successful upload, so it should not cause problems. */
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
