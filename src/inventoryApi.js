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
    const sql = 'SELECT B.*, Inventory.Count \
FROM Inventory \
JOIN Bookstores ON Bookstores.id = Inventory.Bookstore AND Inventory.Bookstore = ? \
JOIN (SELECT Books.id, Books.Author, Books.Translator, Publishing.Publishing, Books.PublishingDate, \
Languages.Language, Types.Type, Books.ISBN, Books.Image, Books.Price FROM Books \
JOIN Publishing ON Publishing.id = Books.Publishing \
JOIN Languages ON Languages.id = Books.Language \
JOIN Types ON Types.id = Books.Type) as B ON B.id = Inventory.Book \
ORDER BY B.ISBN';
    connection.query(sql, [bookstore.id], (err, result, fields) => {
      if (err) {
        console.log(err);
        res.json({ success: false });
      }
      res.json({
        success: true,
        result: {
          books: result
        }
      });
    });
  });

module.exports = router;