"use strict"

// npm
require("dotenv-defaults").config()
const match = require("micro-route/match")
const { json } = require("micro")
const next = require("next")
const PouchDB = require("pouchdb-core")
const LevelPouch = require("pouchdb-adapter-leveldb")
// const HttpPouch = require("pouchdb-adapter-http")
// const mapreduce = require("pouchdb-mapreduce")
// const replication = require('pouchdb-replication')
// const allDbs = require("pouchdb-all-dbs")

PouchDB.plugin(LevelPouch)
// .plugin(HttpPouch)
// .plugin(mapreduce)
// .plugin(replication)

// allDbs(PouchDB)

const db = new PouchDB(process.env.DB_NAME)
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const is3 = (req) => {
  const o = match(req, "/db3/:id")
  return o && o.params
}

const isPut = (req) => match(req, "/db1", ["PUT"])

function main(req, res) {
  if (isPut(req)) return json(req).then(db.put)

  const abc = is3(req)
  if (abc) return app.render(req, res, "/db3", abc)

  return handle(req, res)
}

const setup = (handler) => app.prepare().then(() => handler)

module.exports = setup(main)
