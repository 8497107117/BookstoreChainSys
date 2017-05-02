'use strict';

const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('./config.js');
const router = express.Router();
const connection = mysql.createConnection(config.databaseConfig);

const mockingApi = (io) => {
  connection.connect((err) => {
    if (err) throw err;
  });

  router.route('/books')
    .get((req, res) => {
      const { bookstore } = req;
      const sql = 'SELECT Books.* From Books';
      connection.query(sql, (err, result, fields) => {
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

  router.route('/remove')
    .post((req, res) => {
      const { bookstore, body: { value } } = req;
      const sql = 'DELETE FROM Inventory WHERE Bookstore = ? AND Book = ?';
      connection.query(sql, [bookstore.id, value], (err, result, fields) => {
        if (err) {
          console.log(err);
          res.json({
            success: false,
            result: {
              msg: 'Remove Book Fail'
            }
          });
        }
        res.json({
          success: true,
          result: {
            msg: 'Remove Book Success'
          }
        });
      });
    });

  return router;
}

module.exports = mockingApi;