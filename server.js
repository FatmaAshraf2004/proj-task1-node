const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const { title } = require('process');

mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to the database successfully!'))
.catch(err => console.error('Error connecting to the database:', err));

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


function handle404(req, res, next) {
  if (req.accepts('html')) {
    res.status(404).send('<h1>Page Not Found!</h1>');
  } else if (req.accepts('json')) {
    res.status(404).json({ error: 'Page Not Found!' });
  } else if (req.accepts('text')) {
    res.status(404).send('Page Not Found!');
  } else {
    res.status(404).send('Page Not Found!');
  }
}

app.use(handle404);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my Node.js project .. this is home page!');
});

app.use((req, res) => {
  res.status(404).send('Page Not Found!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
