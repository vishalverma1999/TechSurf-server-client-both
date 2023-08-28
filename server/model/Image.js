// Creating Image Model

const mongoose = require('mongoose');   // importing mongoose

// Creating ImageSchema
const ImageSchema = new mongoose.Schema(
    {
        // username: { type: String, required: true, unique: true },
        imageData: {type: Buffer},
        imageFormat: {type: String},
        imageOriginalFileName: {type: String}
    },
    { timestamps: true }   // This will create createdAt and updatedAt time both
);

module.exports = mongoose.model("Image", ImageSchema)