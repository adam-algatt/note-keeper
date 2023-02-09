const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const bp = require('body-parser')
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes')
dotenv.config();

const ENV = process.env;
const PORT = ENV.PORT || 5009;
// connectDB();
const app = express();
app.use(bp.urlencoded({ extended: true }))
app.use(cors());
app.use(bp.json())

app.use('/note', noteRoutes);
connectDB();

    app.listen(PORT, () => {
        console.log(`the app she listens on http://localhost:${PORT}`)
    })
