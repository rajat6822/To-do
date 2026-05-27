const express = require('express')
const NoteModel = require('./models/notes.model')

const app = express()

app.use(express.json())

// @route POST /api/notes
// @description Create a new note need title and description in the request body
// @access Public

app.post(
    '/api/notes',
    async (req, res) => {

        const { title, description } = req.body

        // -------- Validations ----------

        if (!title)
            return res.status(400).json({
                error: 'Title is required'
            })

        if (!description)
            return res.status(400).json({
                error: 'Description is required'
            })

        if (title.trim().length < 4)
            return res.status(400).json({
                error: 'Title must be at least 4 characters long'
            })

        if (description.trim().length < 10)
            return res.status(400).json({
                error: 'Description must be at leat 10 characters long'
            })

        // ----if validation passes create the note ----
        const newNote = await NoteModel.create({
            title,
            description
        })

        return res.status(201).json({
            message: "Note created succesfully",
            note: newNote
        })

    }
)

module.exports = app