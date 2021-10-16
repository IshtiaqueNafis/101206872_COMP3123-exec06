const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'});


const Notes = require('./models/NotesModel');

mongoose.connect(process.env.MONGO_URI, {
        // mongoose.connect this connects to database.
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const notesSeeding = JSON.parse(fs.readFileSync(`${__dirname}/_data/notes.json`, 'utf-8'));

const importData = async () => {
    try {
        await Notes.create(notesSeeding);
        console.log(`Importing Data`)

    } catch (err) {
        console.log(err)
    }
}
const deletetData = async () => {
    try {
        await Notes.deleteMany();
        console.log(`Deleting Data`)


    } catch (err) {
        console.log(err)
    }
}

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deletetData();
}