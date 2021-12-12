const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const dotenv = require('dotenv');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs-extra');
const { XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser');
const serialize = require('node-serialize')
dotenv.config();
const { Pool, Client } = require('pg');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//Pool uses env for database connection settings
const pool = new Pool()

const port = 3000;

app.set('view engine', 'pug');

//index page
app.get('/', (req, res) => {
  res.render('index');
});

//SQL injection

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
      res.redirect("/filterGrades")

    } else {
      console.log(resDb.rows)
      let grades = resDb.rows;

      res.render('sql-injection', { grades: grades, gradeBorder: border, protectionTurnedOn: false});
    }
  });
});

//XXE

app.get('/xxe', (req, res) => {
  res.render('xxe', {protectionTurnedOn: false});
});

app.post('/xxeUpload', upload.single('xxeFile'), (req, res, next) => {
  console.log(req.file);
  const options = {
    processEntities: true, 
    parseAttributeValue: true, 
    parseTagValue: true, 
    ignoreAttributes: false,
  };

  const parser = new XMLParser(options);
  fs.readFile(req.file.path, (err, data) => {
    let image = parser.parse(data);

    console.log(image);

    fs.emptyDir('uploads/');
  });

  res.render('xxe', {protectionTurnedOn: false});
});

//deserialization

app.get('/deserialization', (req, res) => {

  let defaultObj = {
    name: "This is name",
    age: 24
  }
  let defaultSerialized = serialize.serialize(defaultObj);
  res.render('deserialization', {protectionTurnedOn: false, defaultObj: defaultSerialized, result: null, resultKeys: []});
})

app.post('/deserialize', (req, res) => {
  let serializedString = req.body.object;
  let deserializedObj = serialize.unserialize(serializedString, res);
  let resultKeys = Object.keys(deserializedObj);

  res.render('deserialization', {protectionTurnedOn: false, defaultObj: serializedString, 
                                result: deserializedObj, resultKeys: resultKeys
  });
});

app.post('/deserializeProtected', (req, res) => {
  let serializedString = req.body.object;
  let deserializedObj = JSON.parse(serializedString)
  let resultKeys = Object.keys(deserializedObj);

  res.render('deserialization', {protectionTurnedOn: true, defaultObj: serializedString, 
                                result: deserializedObj, resultKeys: resultKeys
  });
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`)
});