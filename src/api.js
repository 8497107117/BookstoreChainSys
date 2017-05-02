'use strict';

const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('./config.js');
const inventoryApi = require('./inventoryApi.js');
const router = express.Router();
const connection = mysql.createConnection(config.databaseConfig);

const api = (io) => {
  connection.connect((err) => {
    if (err) throw err;
  });

  router.route('/authenticate')
    .post((req, res) => {
      const { store, password } = req.body;
      const sql = 'SELECT Bookstores.id, Bookstores.Name, Bookstores.Password, Bookstores.Phone, \
Bookstores.Address, Region.Region \
FROM Bookstores \
JOIN Region ON Region.id = Bookstores.Region \
WHERE Name = ?';
      connection.query(sql, [store], (err, result, fields) => {
        if (err) {
          console.log(err);
          res.json({ success: false });
        }
        let bookstore = result[0];
        if (!bookstore) {
          res.json({
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
            res.json({
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
                res.json({
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
        res.json({ success: false });
      }
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          console.log(err);
          res.json({ success: false });
        }
        res.json({
          success: true,
          result: decoded
        });
      });
    });

  //  Middleware to protect API
  router.use((req, res, next) => {
    if (!req.headers.authorization) {
      return res.sendStatus(403);
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }
        req.bookstore = decoded;
        next();
      });
    }
    else {
      return res.sendStatus(403);
    }
  });

  router.use('/inventory', inventoryApi(io));

  return router;
};

module.exports = api;