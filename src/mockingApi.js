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

router.route('/sell')
  .post((req, res) => {
    const { bookstore, body: { value, count } } = req;
    const sql = 'UPDATE Inventory SET Count = Count - ? WHERE Bookstore = ? AND Book = ? AND Count >= ?';
    connection.query(sql, [count, bookstore.id, value, count], (err, result, fields) => {
      if (err || !result.changedRows) {
        console.log(err);
        res.json({
          success: false,
          result: {
            msg: 'Sell Book Fail'
          }
        });
      }
      else {
        res.json({
          success: true,
          result: {
            msg: 'Sell Book Success'
          }
        });
      }
    });
  });

router.route('/purchase')
  .post((req, res) => {
    const { bookstore, body: { value, count } } = req;
    let sql = 'SELECT * FROM Inventory WHERE Bookstore = ? AND Book = ?';
    connection.query(sql, [bookstore.id, value], (err, result, fields) => {
      if (err) {
        console.log(err);
        res.json({
          success: false,
          result: {
            msg: 'Purchase Book Fail'
          }
        });
      }
      else {
        sql = result[0] ? 'UPDATE Inventory SET Count = Count + ? WHERE Bookstore = ? AND Book = ?'
          : 'INSERT INTO Inventory (Bookstore, Book, Count) VALUES(?, ?, ?)';
        const param = result[0] ? [count, bookstore.id, value] : [bookstore.id, value, count];
        connection.query(sql, param, (err, result, fields) => {
          if (err) {
            console.log(err);
            res.json({
              success: false,
              result: {
                msg: 'Purchase Book Fail'
              }
            });
          }
          res.json({
            success: true,
            result: {
              msg: 'Purchase Book Success'
            }
          });
        });
      }
    });
  });

router.route('/return')
  .post((req, res) => {
    const { bookstore, body: { value, count } } = req;
    const sql = 'UPDATE Inventory SET Count = Count - ? WHERE Bookstore = ? AND Book = ? AND Count >= ?';
    connection.query(sql, [count, bookstore.id, value, count], (err, result, fields) => {
      if (err || !result.changedRows) {
        console.log(err);
        res.json({
          success: false,
          result: {
            msg: 'Return Book Fail'
          }
        });
      }
      else {
        res.json({
          success: true,
          result: {
            msg: 'Return Book Success'
          }
        });
      }
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

module.exports = router;