const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
});