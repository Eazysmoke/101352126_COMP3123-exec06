const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    noteTitle: { type: String, required: true, trim: true },
    noteDescription: { type: String, required: true, trim: true },
    // MEDUIM is kept to match the spelling in the starter instructions.
    priority: { type: String, enum: ['HIGH', 'LOW', 'MEDUIM'], default: 'LOW' },
    dateAdded: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
