const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

    const storage = multer.diskStorage({
        destination:(req, File, cb)=>{
            cb(null,'uplodes/products/')
        },

        filename:(req, file, cb) =>{
            const ext = path.extname(file.originalname);
            const uniqueName = uuidv4() + ext
            cb(null,uniqueName)
        }
    });

    const fileFilter = (req, file, cb)=>{
        const allowtypes = /jpeg|jpg|png|webp/;
        const  isValidExt = allowtypes.test(path.extname(file.originalname).toLocaleLowerCase());
        const isValidMime = allowtypes.test(file.mimetype);                               //multipurpose internet mail extension

        if(isValidExt && isValidExt ){
            cb(null , true)
        } else {
            cb(new Error('Only image files (jpeg, jpg, png, webp) are allowed'))
        }
    };

    const uplode = multer({
        storage,
        fileFilter,
        limits:{fileSize: 5* 1024* 1024 } //5 mb
    });

    module.exports=uplode   
    