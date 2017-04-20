'use strict';

const express = require('express');
const router = express.Router();

router.route('/auth/register')
    .post(function(req, res) {
        res.sendStatus(201);
    });

module.exports = router;