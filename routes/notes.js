const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2: Add a new note using: POST "/api/notes/addnote"
router.post('/addnote', fetchuser, async (req, res) => {
    try {
        const { title, description } = req.body;
        const note = new Notes({
            title, description, user: req.user.id
        })

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

// ROUTE 3: Delete a note using: DELETE "/api/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Note Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted" });
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

module.exports = router;