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

router.route('/authenticate')
  .post((req, res) => {
    const { store, password } = req.body;
    connection.query('SELECT * FROM Bookstores WHERE Name = ?', [store], (err, results, fields) => {
      if (err) {
        console.log(err);
        res.sendStatus(403).json({ success: false });
      }
      let bookstore = results[0];
      if (!bookstore) {
        res.sendStatus(403).json({
          success: false,
          result: [{
            field: 'store',
            errMsg: 'Maybe wrong store name'
          },
          {
            field: 'password',
            errMsg: 'Maybe wrong password'
          }]
        });
      }
      else {
        const hash = crypto.createHmac('sha256', config.secret).update(password).digest('hex');
        if (hash != bookstore.Password) {
          res.sendStatus(403).json({
            success: false,
            result: [{
              field: 'password',
              errMsg: 'Wrong password'
            }]
          });
        }
        else {
          delete bookstore.Password;
          jwt.sign(bookstore, config.secret, (err, token) => {
            if (err) {
              console.log(err);
              res.sendStatus(403).json({
                success: false,
                result: [{
                  field: 'store',
                  errMsg: 'Create token error'
                },
                {
                  field: 'password',
                  errMsg: 'Create token error'
                }]
              });
            }
            res.json({
              success: true,
              result: bookstore,
              token
            });
          });
        }
      }
    });
  });

router.route('/verifyAuth')
  .get((req, res) => {
    if (!req.headers.authorization) {
      res.sendStatus(403).json({ success: false });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        console.log(err);
        res.sendStatus(403).json({ success: false });
      }
      res.json({
        success: true,
        result: decoded
      });
    });
  });

module.exports = router;