"use strict"

// core
const { URL } = require("url")

// npm
require("dotenv-defaults").config()
const match = require("micro-route/match")
const { json } = require("micro")
// const { send } = require('micro')
const next = require("next")
// const allDbs = require("pouchdb-all-dbs")
const PouchDB = require("pouchdb-core")
const LevelPouch = require("pouchdb-adapter-leveldb")
// const HttpPouch = require("pouchdb-adapter-http")
// const mapreduce = require("pouchdb-mapreduce")
// const replication = require('pouchdb-replication')

PouchDB.plugin(LevelPouch)
// .plugin(HttpPouch)
// .plugin(mapreduce)
// .plugin(replication)

// allDbs(PouchDB)

const q2o = (u) => {
  const o = {}
  new URL(u, "http://localhost/").searchParams.forEach((k, v) => {
    o[k] = v
  })
  return o
}

const db = new PouchDB(process.env.DB_NAME)

const dev = process.env.NODE_ENV !== "production"

const app = next({ dev })
const handle = app.getRequestHandler()

const is3 = (req) => {
  const o = match(req, "/db3/:id")
  return o && o.params
  // if (!o) return
  // return o.params
}

const isPut = (req) => match(req, "/db1", ["PUT"])

async function main(req, res) {
  const query = q2o(req.url)

  if (isPut(req)) {
    return json(req).then(db.put)
    /*
    return json(req).then((j) => {
      return db.put(j)
    })
    */
  }

  const abc = is3(req)
  if (abc) {
    return app.render(req, res, "/db3", abc)
  }
}

async function setup(handler) {
  await app.prepare()
  return handler
}

module.exports = setup(main)
