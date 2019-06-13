const   mongoose = require('mongoose'),
        servidor = 'http://localhost:3333'

const   File = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },
    boxId: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toObject: { virtuals: true},
    toJSON: { virtuals: true}
})

File.virtual('url').get(function(){

    const url = process.env.URL || servidor

    return `${url}/files/${encodeURIComponent(this.path)}`
})

module.exports = mongoose.model('File', File)