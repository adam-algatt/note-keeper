const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes')
dotenv.config();

const ENV = process.env;
const PORT = ENV.PORT || 5009;
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.json())

app.use('/note', noteRoutes);
connectDB();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
    // return all requests to react app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
    })
  } else {
    app.get('/', (req, res) => {
        res.send('api running')
    })
  }




    app.listen(PORT, () => {
        console.log(`the app she listens on http://localhost:${PORT}`)
    })

