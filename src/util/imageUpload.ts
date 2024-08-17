import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `img-${crypto.randomBytes(4).toString("hex")}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage,
})

export { upload };
