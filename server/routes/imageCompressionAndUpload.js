const router = require("express").Router();
const multer = require('multer');
const sharp = require('sharp');
const Image = require('../model/Image');


// Storage Engin That Tells/Configures Multer for where (destination) and how (filename) to save/upload our files
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});


// The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
// You can create multiple middleware each with a different storage engine config so save different files in different locations on server
// const upload = multer({ storage: fileStorageEngine });

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

router.post("/single", upload.single("image"), async (req, res) => {
    console.log(req.file);
    // res.send("Single FIle upload success");

    try {
        const compressedImageBuffer = await sharp(req.file.buffer)
            .resize(640, 480)
            .webp({ quality: 80, chromaSubsampling: '4:4:4' }) // Specify compression quality (JPEG format)
            .toBuffer();

        // const compressedImageBuffer = await sharp(req.file.path)
        //     .webp({ quality: 80, chromaSubsampling: '4:4:4' }) // Specify compression quality (JPEG format)
        //     .toFile('./output1.webp', (err, info) => { console.log(info); });

        // const metadata = await sharp(req.file.path).metadata();
        // console.log("the metadata is:", metadata);
        console.log(compressedImageBuffer.length / 1024);
        const image = new Image({ imageData: compressedImageBuffer, imageFormat: req.file.mimetype, imageOriginalFileName: req.file.originalname });
        await image.save();

        res.status(200).json({ message: `Image compressed and stored successfully in db. The Compressed file size is ${compressedImageBuffer.length / 1024} kilobytes` });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Error uploading image' });
    }
});



module.exports = router;
