const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const uploadsDir = path.join(
    __dirname,
    "..",
    "uploads",
    "products"
);

fs.mkdirSync(uploadsDir, {
    recursive: true
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const filename = `${uuidv4()}${ext}`;

        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {

    const allowtypes = /jpeg|jpg|png|webp/;

    const isValidExt = allowtypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const isValidMime = allowtypes.test(
        file.mimetype
    );

    if (isValidExt && isValidMime) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only image files (jpeg, jpg, png, webp) are allowed"
            )
        );
    }
};

const uploads = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = uploads;