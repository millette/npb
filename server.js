"use strict"

// core
// const { parse } = require("url")
// const { URL } = require("url")
const { URL } = require("url")

// npm
require("dotenv-defaults").config()
const match = require("micro-route/match")
const { json } = require("micro")
// const { send } = require('micro')
const next = require("next")
const allDbs = require("pouchdb-all-dbs")
const PouchDB = require("pouchdb-core")
const LevelPouch = require("pouchdb-adapter-leveldb")
const HttpPouch = require("pouchdb-adapter-http")
const mapreduce = require("pouchdb-mapreduce")
// const replication = require('pouchdb-replication')

PouchDB.plugin(LevelPouch)
  .plugin(HttpPouch)
  .plugin(mapreduce)
// .plugin(replication)

allDbs(PouchDB)

const q2o = (u) => {
  const o = {}
  new URL(u, "http://localhost/").searchParams.forEach((k, v) => {
    o[k] = v
  })
  return o
}

console.log("DB_NAME:", process.env.DB_NAME)

const db = new PouchDB(process.env.DB_NAME)

// console.log(db)
/*
db.allDocs({ include_docs: true })
  .then(({ rows }) => {
    // console.log(rows.map(({ doc }) => doc))
    return PouchDB.allDbs()
  })
  .then(console.log)
*/

/*
const allDbs = require("pouchdb-all-dbs")
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
*/

// const db = new PouchDB('hiha')

const dev = process.env.NODE_ENV !== "production"

const app = next({ dev })
const handle = app.getRequestHandler()

// const isI = (req) => match(req, "/")
const isA = (req) => match(req, "/a")
const isB = (req) => match(req, "/b")

const isPut = (req) => match(req, "/db1", ["PUT"])

async function main(req, res) {
  // console.log('REQ-keys', Object.keys(req))
  // const parsedUrl = parse(req.url, true)
  // const { query } = parsedUrl
  // const query = q2o(parsedUrl.query)
  const query = q2o(req.url)

  // const u = new URL(req.url)

  /*
  if (isI(req)) {
    return PouchDB.allDbs()
      .then((alldbs) => app.render(req, res, '/', { alldbs }))
  }
  */

  if (isPut(req)) {
    // console.log("PUT", Object.keys(req))
    // return db.put()

    return json(req).then((j) => {
      // console.log(j)
      return db.put(j)
    })
  }

  if (isA(req)) {
    return app.render(req, res, "/b", query)
  }

  if (isB(req)) {
    return app.render(req, res, "/a", query)
  }

  /*
  const parsedUrl = {
    ...new URL(req.url),
    query
  }

  console.log('parsedUrl', parsedUrl)

  return handle(req, res, parsedUrl)
  */
  return handle(req, res)
  // return handle(req, res, req.url)
  /*
  return handle(req, res, {
    ...new URL(req.url),
    query
  })
  */
}

async function setup(handler) {
  await app.prepare()
  return handler
}

module.exports = setup(main)
