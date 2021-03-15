import mongoose, {Schema} from 'mongoose';


const outputItemSchema = new mongoose.Schema({
    depth: Number,

    file_text: String,

    file_urls: [String],

    files: Schema.Types.Mixed,

    image_urls: [String],

    images: {
        type: [{
            url: String,
            path: String,
            checksum: String,
            status: String
        }]
    },

    school_id: Number,

    text: String,

    url: String
});


const OutputItem = mongoose.model('outputItem', outputItemSchema, 'outputItems');

export default OutputItem;
