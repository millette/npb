// self
import PouchDB from "../lib/pouchdb.js"
const db = new PouchDB(process.env.DB_NAME)

export { db }
