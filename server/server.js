const db = require('mysql2/promise');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());

const pool = db.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});

app.get('/api/users', async (req, res) => {
    const query = await pool.query('SELECT * FROM users');
    res.json({ data: query[0] });
});

app.post('/api/register', async (req, res) => {
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, 10);
    try {
        await pool.query('INSERT INTO users (username, password, create_time) VALUES (?, ?, ?)', [username, password, new Date()]);
    } catch (err) {
        console.log(err);
        if (err.code === 'ER_DUP_ENTRY')
            res.json({ status: 'error', msg: 'User already registered' });
        else
            res.json({ status: 'error', msg: 'Something went wrong' });
        return;
    }

    res.json({ status: 'success', msg: 'Registered successfully' });
});

app.post('/api/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = (await pool.query('SELECT * FROM users WHERE username = ?', [username]))[0][0];

    if (bcrypt.compareSync(password, query.password)) {
        res.json({ status: 'success', msg: 'Logged in successfully' });
    } else {
        res.json({ status: 'error', msg: 'Wrong password' });
    }
});

app.listen(process.env.DB_PORT, () => {
    console.log(`Server running on port ${process.env.DB_PORT}`);
});