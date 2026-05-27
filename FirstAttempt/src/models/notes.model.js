const { default: mongoose } = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
})

const NoteModel = mongoose.model('notes', noteSchema)

module.exports = NoteModel