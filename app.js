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
  res.render('index');
});

app.post('/filterGradesProtected', (req, res) => {

  let border = req.body.borderGrade ? req.body.borderGrade : 0;
  let whiteList = ['1', '2', '3', '4', '5'];
  let validatedBorder = 0;

  border = border.toString();
  for (let i = 0; i < border.length; i++) {
    if(whiteList.includes(border.charAt(i))){
      validatedBorder = border.charAt(i);
      break
    }
  }

  pool.query('SELECT * FROM grades WHERE owner_id=1 AND grade > ' + validatedBorder, (err, resDb) => {
    if (err) {
      console.log(err);
      res.redirect("/")

    } else {
      console.log(resDb.rows)
      let grades = resDb.rows;

      res.render('sql-injection', { grades: grades, gradeBorder: border, protectionTurnedOn: true});
    }
  });
});

app.get('/filterGrades', (req, res) => {

  pool.query('SELECT * FROM grades WHERE owner_id=1', (err, resDb) => {
      if (err) {
        throw err;

      } else {
        console.log(resDb.rows)
        let grades = resDb.rows;

        res.render('sql-injection', { grades: grades, gradeBorder: 0, protectionTurnedOn: false});
      }
    });
});

app.post('/filterGrades', (req, res) => {

  let border = req.body.borderGrade ? req.body.borderGrade : 0;
  pool.query('SELECT * FROM grades WHERE owner_id=1 AND grade > ' + border, (err, resDb) => {
    if (err) {
      console.log(err);
      res.redirect("/")

    } else {
      console.log(resDb.rows)
      let grades = resDb.rows;

      res.render('sql-injection', { grades: grades, gradeBorder: border, protectionTurnedOn: false});
    }
  });
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
});