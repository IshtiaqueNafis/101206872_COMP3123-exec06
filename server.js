const express = require('express');
const dotenv = require("dotenv"); // this for dotNev
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error');

dotenv.config({path: './config/config.env'});
const connectDb = require('./config/db')
connectDb();


const app = express();

app.use(express.json());


//geting routes
const notes = require('./routes/NoteRoutes');

app.use('/mongoosejs.com/docs/api', notes);

app.use(errorHandler);

const PORT = process.env.PORT || 8081;

const server = app.listen(PORT, () => console.log(`Sever is running in ${process.env.NODE_ENV} mode on port ${PORT}`));

process.on('unhandledRejection', (error, promise) => {
    console.log(`Error: ${error.message}`);

    server.close(() => process.exit(1));

})