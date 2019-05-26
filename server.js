"use strict"

// core
const { parse } = require('url')

// npm
const allDbs = require("pouchdb-all-dbs")
// const jsonC = require('json-cycle')
const match = require('micro-route/match')
// const { send } = require('micro')
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

allDbs(PouchDB)

// const db = new PouchDB('hiha')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

const isI = req => match(req, '/')
const isA = req => match(req, '/a')
const isB = req => match(req, '/b')

async function main (req, res) {
  // console.log('RES-keys', Object.keys(res), res.end, typeof res.end)
  const parsedUrl = parse(req.url, true)
  const { query } = parsedUrl

  if (isI(req)) {
    return PouchDB.allDbs()
      .then((alldbs) => app.render(req, res, '/', { alldbs }))
  }

  if (isA(req)) {
    return app.render(req, res, '/b', query)
  }

  if (isB(req)) {
    return app.render(req, res, '/a', query)
  }

  return handle(req, res, parsedUrl)
}

async function setup (handler) {
  await app.prepare()
  return handler
}

module.exports = setup(main)
