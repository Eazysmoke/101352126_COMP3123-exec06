const noteModel = require('../models/NotesModel');
const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = express.Router();

// Reject invalid IDs before querying MongoDB.
noteRoutes.param('noteId', (req, res, next, id) => {
    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).json({ message: 'Invalid note ID' });
    }
    next();
});

// Create a new note.
noteRoutes.post('/notes', async (req, res, next) => {
    if (!req.body?.content || typeof req.body.content !== 'object' || Array.isArray(req.body.content)) {
        return res.status(400).json({ message: 'Note content can not be empty' });
    }
    try {
        const note = new noteModel(req.body.content);
        await note.save();
        res.status(201).json(note);
    } catch (err) { next(err); }
});

// Retrieve all notes. No request body is needed.
noteRoutes.get('/notes', async (req, res, next) => {
    try {
        res.json(await noteModel.find());
    } catch (err) { next(err); }
});

// Retrieve one note.
noteRoutes.get('/notes/:noteId', async (req, res, next) => {
    try {
        const note = await noteModel.findById(req.params.noteId);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) { next(err); }
});

// Update a note using the same content format as POST.
noteRoutes.put('/notes/:noteId', async (req, res, next) => {
    if (!req.body?.content || typeof req.body.content !== 'object' || Array.isArray(req.body.content)) {
        return res.status(400).json({ message: 'Note content can not be empty' });
    }
    try {
        const note = await noteModel.findById(req.params.noteId);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        const { noteTitle, noteDescription, priority } = req.body.content;
        if (noteTitle !== undefined) note.noteTitle = noteTitle;
        if (noteDescription !== undefined) note.noteDescription = noteDescription;
        if (priority !== undefined) note.priority = priority;
        note.dateUpdated = new Date();
        await note.save();
        res.json(note);
    } catch (err) { next(err); }
});

// Delete a note. No request body is needed.
noteRoutes.delete('/notes/:noteId', async (req, res, next) => {
    try {
        const note = await noteModel.findByIdAndDelete(req.params.noteId);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted successfully' });
    } catch (err) { next(err); }
});

module.exports = noteRoutes;
