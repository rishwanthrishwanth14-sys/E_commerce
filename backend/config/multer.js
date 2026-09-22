const multer = require("multer");
const path = require("path");
const fs = require("fs")
const { v4: uuidv4 } = require("uuid");

const uplodeDir = path.join(
    __dirname,
    "..",
    "uplodes",
    "products"
);

fs.mkdirSync(uplodeDir, {
    recursive: true
});

const storage = multer.diskStorage({
    destination: (req, File, cb) => {
        cb(null, uplodeDir)
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const filename = `${uuidv4()}${ext}`
        cb(null, filename)
    }
});

const fileFilter = (req, file, cb) => {
    const allowtypes = /jpeg|jpg|png|webp/;
    const isValidExt = allowtypes.test(path.extname(file.originalname).toLowerCase());
    const isValidMime = allowtypes.test(file.mimetype);//mime = multipurpose internet mail extension  edhu yedhuku naa sila person image illama pdf ahh name change panni image la uplode panna vaipu iruku adha dedect panuradhuku 

    if (isValidExt && isValidMime) {
        cb(null, true)
    } else {
        cb(new Error('Only image files (jpeg, jpg, png, webp) are allowed'))
    }
};

const uplode = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } //5 mb
});

module.exports = uplode
