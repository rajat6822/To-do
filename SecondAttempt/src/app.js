const express = require('express')
const NotesModel = require('./models/notes.model')

const app = express()

app.use(express.json())

// @route POST /api/notes
// @description Create a new note need title and description in the request body
// @access Public
app.post(
    '/api/notes',
    async (req, res) => {
        const { title, description } = req.body


        // ------Validations------
        if (!title)
            return res.status(400).json({
                error: "Title is required"
            })

        if (!description)
            return res.status(400).json({
                error: "Description is required"
            })

        if (title.trim().length < 4)
            return res.status(400).json({
                error: "Title must be at least 4 characters long"
            })

        if (description.trim().length < 10)
            return res.status(400).json({
                error: "Description must be at least 10 characters long"
            })

        // ------if validation passes create the note------

        const newNote = await NotesModel.create({
            title,
            description
        })

        return res.status(201).json({
            message: "Note created succefully",
            note: newNote
        })
    }
)

// @route get /api/notes
// @description Read all notes
// @access Public
app.get(
    '/api/notes',
    async (req, res) => {
        const notes = await NotesModel.find()

        return res.status(200).json(notes)
    }
)

// @route patch /api/notes/:id
// @description Update a note by it's id
// @access Public
app.patch(
    '/api/notes/:id',
    async (req, res) => {
        const { id } = req.params
        const { description } = req.params


        // ------Validations------
        if (!description)
            return res.status(400).json({
                message: "Description is required"
            })

        if (description.trim().length < 10)
            return res.status(400).json({
                error: "Description must be at least 10 characters long"
            })

        // If validations passes update the user

        const note = await NotesModel.findByIdAndUpdate(id)

        if (!note)
            return res.status(404).json({
                error: "Note not found"
            })

        note.description = description
        await note.save()

        return res.status(200).json({
            message: "Notes updated succesfully"
        })

    }
)


module.exports = app