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
        try {

            const { title, description } = req.body


            //  ------Validations------
            if (!title)
                return res.status(400).json({
                    error: "Title is required"
                })

            if (!description)
                return res.status(400).json({
                    error: "Desciption is required"
                })

            if (title.trim().length < 4)
                return res.status(400).json({
                    error: "Title must be at least 4 characters long"
                })

            if (description.trim().length < 10)
                return res.status(400).json({
                    error: "Description must be at least 10 characters long"
                })

            // If validations passes then create the note
            const newNote = await NotesModel.create({
                title,
                description
            })

            return res.status(201).json({
                message: "Note Created succesfully",
                note: newNote
            })

        } catch (error) {
            return res.status(500).json({
                message: "Error in creating notes",
                error: error.message
            })
        }
    }
)

// @route GET /api/notes
// @description Read all notes
// @access Public
app.get(
    '/api/notes',
    async (req, res) => {
        try {

            const notes = await NotesModel.find()

            return res.status(201).json(notes)
            
        } catch (error) {
            return res.status(500).json({
                message: "Error in fetching all notes",
                error: error.message
            })
        }
    }
)


module.exports = app