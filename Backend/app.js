const express = require('express')

const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')

app.use(cors({ origin: true }))
app.use(express.json())

module.exports = app