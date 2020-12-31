const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Model Imports

let Card = require('./models/dbCards.model');


// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = "mongodb+srv://paul:5HgKzwOpTS4Q37Hd@cluster0.0iyi8.mongodb.net/tinderdb?retryWrites=true&w=majority"

// Middleware
app.use(express.json());
app.use(cors());

// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// API Endpoints
app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
});

// Creates a new card
app.post('/tinder/cards', (req, res) => {
    const cardName = req.body.name;
    const cardImg = req.body.imgUrl;
    const newCard = new Card({ name: cardName, imgUrl: cardImg });
    newCard.save()
        .then(() => res.json('User Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Gets all of the existing cards
app.get('/tinder/cards', (req, res) => {
    Card.find()
        .then(cards => res.json(cards))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Listener
app.listen(port, () => {
    console.log(`Listening on Localhost on Port ${port}`);
});

// mongodb+srv://paul:dbpassword@cluster0.0iyi8.mongodb.net/learnmern?retryWrites=true&w=majority