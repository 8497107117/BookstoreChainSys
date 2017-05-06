'use strict';

const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('./config.js');
const router = express.Router();
const connection = mysql.createConnection(config.databaseConfig);

const transferApi = (io) => {

	io.on('connection', (socket) => {
		socket.on('authentication connect', (id) => {
			socket.bookstoreID = id;
			console.log(`user connect: ${socket.bookstoreID}`);
		});
		socket.on('get transfer', () => {
			const sql = 'SELECT Transfer.id, B.id as BookID, B.Name, B.ISBN, B1.id as ReqID, B1.Name as Req, \
B1.Phone as ReqPhone, B2.id as ResID, B2.Name as Res, B2.Phone as ResPhone, Transfer.Count, Transfer.Accept \
FROM Transfer \
JOIN Bookstores B1 ON B1.id = Transfer.Request \
JOIN Bookstores B2 ON B2.id = Transfer.Response \
JOIN (SELECT Books.id, Books.Name, Books.Author, Books.Translator, Publishing.Name as PublishingName, \
Books.PublishingDate, Languages.Language, Types.Type, Books.ISBN, Books.Image, Books.Price FROM Books \
JOIN Publishing ON Publishing.id = Books.Publishing \
JOIN Languages ON Languages.id = Books.Language \
JOIN Types ON Types.id = Books.Type) as B ON B.id = Transfer.Book \
WHERE B1.id = ? OR B2.id = ?';
			connection.query(sql, [socket.bookstoreID, socket.bookstoreID], (err, result) => {
				if (err) {
					console.log(err);
				}
				else {
					socket.emit('load transfer', { id: socket.bookstoreID, transfer: result });
				}
			});
		});
		socket.on('send request', (req) => {
			let sql = 'SELECT * FROM Transfer WHERE Book = ? AND Request = ? AND Response = ?';
			connection.query(sql, [req.BookID, socket.bookstoreID, req.id], (err, result) => {
				if (err) {
					console.log(err);
				}
				else {
					sql = result[0] ? 'UPDATE Transfer SET Count = Count + ?, Accept = 0 \
WHERE Book = ? AND Request = ? AND Response = ?'
						: 'INSERT INTO Transfer (Book, Request, Response, Count, Accept) VALUES(?, ?, ?, ?, 0)';
					const param = result[0] ? [req.reqCount, req.BookID, socket.bookstoreID, req.id] :
						[req.BookID, socket.bookstoreID, req.id, req.reqCount];
					connection.query(sql, param, (err, result) => {
						if (err) {
							console.log(err);
						}
						io.emit('update', false);
					});
				}
			});
		});
		socket.on('remove request', (req) => {
			let sql = 'DELETE FROM Transfer WHERE Book = ? AND Request = ? AND Response = ?';
			connection.query(sql, [req.BookID, req.ReqID, req.ResID], (err, result) => {
				if (err) {
					console.log(err);
				}
				else if (req.Accept) {
					sql = 'UPDATE Inventory SET Count = Count + ? WHERE Bookstore = ? AND Book = ?';
					connection.query(sql, [req.Count, req.ReqID, req.BookID], (err, result) => {
						if (err) {
							console.log(err);
						}
						else {
							io.emit('update', true);
						}
					});
				}
				else {
					io.emit('update', false);
				}
			});
		});
		socket.on('send response', (res) => {
			let sql = 'DELETE FROM Transfer WHERE Book = ? AND Request = ? AND Response <> ?';
			connection.query(sql, [res.BookID, res.ReqID, res.ResID], (err, result) => {
				if (err) {
					console.log(err);
				}
				else {
					let sql = 'UPDATE Transfer SET Accept = 1 WHERE Book = ? AND Request = ? AND Response = ?';
					connection.query(sql, [res.BookID, res.ReqID, socket.bookstoreID], (err, result) => {
						if (err) {
							console.log(err);
						}
						else if (!res.Accept) {
							sql = 'UPDATE Inventory SET Count = Count - ? WHERE Bookstore = ? AND Book = ?';
							connection.query(sql, [res.Count, res.ResID, res.BookID], (err, result) => {
								if (err) {
									console.log(err);
								}
								else {
									io.emit('update', true);
								}
							});
						}
						else {
							io.emit('update', false);
						}
					});
				}
			});
		});
		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});

	connection.connect((err) => {
		if (err) throw err;
	});

	router.route('/region')
		.get((req, res) => {
			const sql = 'SELECT * FROM Region';
			connection.query(sql, (err, result) => {
				if (err) {
					console.log(err);
					res.json({ success: false });
				}
				res.json({
					success: true,
					result: {
						region: result
					}
				});
			});
		});

	router.route('/inventoryChain')
		.post((req, res) => {
			const { bookstore, body: { book, region } } = req;
			const sql = 'SELECT Bs.id, Bs.Name, Bs.Phone, Bs.Region, Books.id as BookID, Inventory.Count \
FROM Inventory \
JOIN (SELECT Bookstores.id, Bookstores.Name, Bookstores.Phone, Region.Region FROM Bookstores \
JOIN Region ON Region.id = Bookstores.Region WHERE Bookstores.id <> ? AND Bookstores.Region = ?) \
as Bs ON Bs.id = Inventory.Bookstore \
JOIN Books ON Books.id = Inventory.Book AND (LOCATE(?, Books.Name) > 0 OR LOCATE(?, Books.ISBN) > 0)';
			connection.query(sql, [bookstore.id, region ? region : bookstore.RegionID, book, book], (err, result) => {
				if (err) {
					console.log(err);
					res.json({ success: false });
				}
				res.json({
					success: true,
					result: {
						inventoryChain: result
					}
				});
			});
		});
	return router;
}

module.exports = transferApi;