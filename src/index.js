import express from 'express'
import { createPool } from 'mysql2/promise'
import { config } from 'dotenv'
config()

const app = express()

console.log({
    host: process.env.MYSQLDB_HOST,
    password: process.env.MYSQLDB_PASSWORD,
    port: process.env.MYSQLDB_DOCKER_PORT
})

const pool = createPool({
    host: process.env.MYSQLDB_HOST,
    user: 'root',
    password: process.env.MYSQLDB_PASSWORD,
    port: process.env.MYSQLDB_DOCKER_PORT
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/ping', async (req, res) => {
    const result = await pool.query('SELECT NOW()')
    res.json(result[0])
})

app.listen(process.env.NODE_DOCKER_PORT)
console.log('Server on port', process.env.NODE_DOCKER_PORT)