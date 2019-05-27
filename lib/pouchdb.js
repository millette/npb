// npm
const isNode = require("detect-node")
const PouchDB = !isNode && require("./pouchdb-browser.js")

module.exports = PouchDB

/*
import isNode from 'detect-node'

// import dynamic from 'next/dynamic'


// import allDBs from "pouchdb-all-dbs"

import allDBs from "pouchdb-all-dbs"
import PouchDB from 'pouchdb-core'
import IDBPouch from 'pouchdb-adapter-idb'
import LevelPouch from 'pouchdb-adapter-leveldb'
import HttpPouch from 'pouchdb-adapter-http'
import mapreduce from 'pouchdb-mapreduce'
import replication from 'pouchdb-replication'

PouchDB.plugin(isNode? LevelPouch : IDBPouch)
  .plugin(HttpPouch)
  .plugin(mapreduce)
  .plugin(replication)

if (!isNode) allDBs(PouchDB)

const PouchDB = dynamic(() => isNode ? import('./pouchdb-node') : import('./pouchdb-browser'))

// allDBs(PouchDB)

export default PouchDB
*/
