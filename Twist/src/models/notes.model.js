const { default: mongoose } = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
})

const NotesModel = mongoose.model('notes', noteSchema)

module.exports = NotesModel