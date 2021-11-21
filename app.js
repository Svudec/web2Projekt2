const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const { Pool, Client } = require('pg');

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

          res.render('index', { grades: grades });
        }
      });
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
});