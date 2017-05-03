'use strict';

const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('./config.js');
const router = express.Router();
const connection = mysql.createConnection(config.databaseConfig);

connection.connect((err) => {
  if (err) throw err;
});

router.route('/')
  .get((req, res) => {
    const { bookstore } = req;
    const sql = 'SELECT Transaction.id, B.id AS Bookid, B.Name, B.Author, B.Translator, B.Publishing, B.PublishingDate, \
B.Language, B.Type, B.ISBN, B.Image, B.Price, Transaction.Count, Transaction.Time \
FROM Transaction \
JOIN Bookstores ON Bookstores.id = Transaction.Bookstore AND Transaction.Bookstore = ? \
JOIN (SELECT Books.id, Books.Name, Books.Author, Books.Translator, Publishing.Publishing, Books.PublishingDate, \
Languages.Language, Types.Type, Books.ISBN, Books.Image, Books.Price FROM Books \
JOIN Publishing ON Publishing.id = Books.Publishing \
JOIN Languages ON Languages.id = Books.Language \
JOIN Types ON Types.id = Books.Type) as B ON B.id = Transaction.Book \
ORDER BY Transaction.Time DESC';
    connection.query(sql, [bookstore.id], (err, result, fields) => {
      if (err) {
        console.log(err);
        res.json({ success: false });
      }
      res.json({
        success: true,
        result: {
          transaction: result
        }
      });
    });
  });

module.exports = router;