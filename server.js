"use strict"

// core
const { parse } = require('url')

// npm
const jsonC = require('json-cycle')
const match = require('micro-route/match')
const { send } = require('micro')
const next = require('next')
const PouchDB = require('pouchdb-core')
const LevelPouch = require('pouchdb-adapter-leveldb')
const HttpPouch = require('pouchdb-adapter-http')
const mapreduce = require('pouchdb-mapreduce')
const replication = require('pouchdb-replication')

PouchDB.plugin(LevelPouch)
  .plugin(HttpPouch)
  .plugin(mapreduce)
  .plugin(replication);

const db = new PouchDB('hiha')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

const isI = req => match(req, '/')
const isA = req => match(req, '/a')
const isB = req => match(req, '/b')
const isZ = req => match(req, '/z')

async function main (req, res) {
  // console.log('RES-keys', Object.keys(res), res.end, typeof res.end)
  const parsedUrl = parse(req.url, true)
  const { query } = parsedUrl

  if (isI(req)) {
    return app.render(req, res, '/', { db: jsonC.decycle(db) })
  }

  if (isA(req)) {
    return app.render(req, res, '/b', query)
  }

  if (isB(req)) {
    return app.render(req, res, '/a', query)
  }

  if (isZ(req)) {
    // When rendering client-side, we will request the same data from this route
      // res.json(db)
      // return JSON.parse(jsonC.stringify(db))
      return send(res, 200, {is: 'hello'})
    /*
      server.get('/_data/item', (req, res) => {
      const itemData = api.getItem()
      res.json(itemData)
    })
    */
  }

  return handle(req, res, parsedUrl)
}

async function setup (handler) {
  await app.prepare()
  return handler
}

module.exports = setup(main)
