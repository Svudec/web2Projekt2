const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { Pool, Client } = require('pg');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//Pool uses env for database connection settings
const pool = new Pool()

const port = 3000;

app.set('view engine', 'pug');

app.get('/', (req, res) => {

    pool.query('SELECT * FROM grades WHERE owner_id=1', (err, resDb) => {
        if (err) {
          throw err;

        } else {
          console.log(resDb.rows)
          let grades = resDb.rows;

          res.render('index', { grades: grades, gradeBorder: 0});
        }
      });
});

app.post('/filterGrades', (req, res) => {

  let border = req.body.borderGrade ? req.body.borderGrade : 0;
  pool.query('SELECT * FROM grades WHERE owner_id=1 AND grade > ' + border, (err, resDb) => {
    if (err) {
      throw err;

    } else {
      console.log(resDb.rows)
      let grades = resDb.rows;

      res.render('index', { grades: grades, gradeBorder: border});
    }
  });
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
});