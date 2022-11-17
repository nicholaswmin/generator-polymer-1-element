'use strict'

const fs = require('fs')
const path = require('path')
const argv = require('nomnom').parse()
const express = require('express')
const http = require('http')
const https = require('https')

const app = express()
const server = argv['disable-local-ssl'] ?
  http.createServer(app) :
  https.createServer({
    key: fs.readFileSync('ssl/dev/server.key', 'utf8'),
    cert: fs.readFileSync('ssl/dev/server.crt', 'utf8')
  }, app)

app.set('port', (process.env.PORT || <%= port %>))

app.use(
  '/bower_components',
  express.static(path.resolve(__dirname, 'bower_components'))
)
app.use('/', express.static(path.resolve(__dirname, './')))
app.get('/', async (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.get('/test', async (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'test/<%= element_name %>_test.html'))
})

server.listen(app.get('port'), () => {
  console.info(
    `${server.cert ? 'HTTPS' : 'HTTP'} listening on: ${app.get('port')}`
  )
})
