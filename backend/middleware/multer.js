
const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
    req.profile_pic = uniqueSuffix;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage: storage });
// Middleware to handle file upload and set req.filename
const uploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: 'Error uploading file' });
    }
    next();
  });
};
module.exports = { uploadMiddleware };