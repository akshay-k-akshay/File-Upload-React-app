const multer = require("multer");
const util = require("util");
const path = require("path");
const uuid = require("uuid").v4;

const dir = path.join(__dirname, "../../public");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    req.body.name = file.originalname
    cb(null, `${uuid()}${path.extname(file.originalname)}`);
  }
});
const uploadFile = multer({ storage }).single("file");

exports.uploadFile = async (req, res, next) => {
  const upload = util.promisify(uploadFile);
  await upload(req, res);

  next();
};
