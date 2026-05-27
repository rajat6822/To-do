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

// @route GET /api/notes
// @description Get all notes
// @access Public
app.get(
    '/api/notes',
    async (req, res) => {
        const notes = await NoteModel.find()

        return res.status(200).json({
            massage: "Notes fetched succesfully",
            notes
        })
    }
)

// @route PATCH /api/notes/:id
// @description Update a note by id
// @access Public
app.patch(
    '/api/notes/:id',
    async (req, res) => {
        const { id } = req.params

        const { description } = req.body


        // ------Validaiton------
        if (!description)
            return res.status(400).json({
                error: "Description is required"
            })

        if (description.trim().length < 10)
            return res.status(400).json({
                error: "Description must be at least 10 characters long"
            })

        // If validation passes find note and update
        const note = await NoteModel.findByIdAndUpdate(id) 

        if(!note) 
            return res.status(400).json({
                error: "Note not found"
        })

        note.description = description
        await note.save()

        return res.status(200).json({
            message: "Note updated successfully",
            note
        })
 
    }
)

module.exports = app