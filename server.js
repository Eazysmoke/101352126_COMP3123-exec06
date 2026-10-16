const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes');

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/comp3123_exec06';
const PORT = process.env.PORT || 8081;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Note taking application - Week06 Exercise</h1>');
});
app.use('/', noteRoutes);
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError' || err.name === 'CastError' || err.type === 'entity.parse.failed') {
        return res.status(400).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' });
});

if (require.main === module) {
    mongoose.connect(DB_URL).then(() => {
        console.log('Successfully connected to MongoDB');
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    }).catch(err => {
        console.error('Could not connect to the database:', err.message);
        process.exitCode = 1;
    });
}
module.exports = app;
