const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes')
const path = require('path')
dotenv.config();

const ENV = process.env;
const PORT = ENV.PORT || 5009;
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.json())

app.use('/note', noteRoutes)

console.log(path.join(__dirname, '../client/build').yellow.underline)

// ------------------- deployment -------------------
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('api running')
    })
}

// ------------------- deployment -------------------


connectDB();

    app.listen(PORT, () => {
        console.log(`App listening on http://localhost:${PORT}`)
    })

