// npm

// import allDBs from "pouchdb-all-dbs"
import PouchDB from 'pouchdb-core'
import IDBPouch from 'pouchdb-adapter-idb'
import HttpPouch from 'pouchdb-adapter-http'
import mapreduce from 'pouchdb-mapreduce'
import replication from 'pouchdb-replication'

PouchDB.plugin(IDBPouch)
  .plugin(HttpPouch)
  .plugin(mapreduce)
  .plugin(replication)

// allDBs(PouchDB)

export default PouchDB
