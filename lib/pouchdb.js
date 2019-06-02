// npm
import isNode from "detect-node"

// self
const PouchDB = require(isNode ? "./pouchdb-node.js" : "./pouchdb-browser.js")

module.exports = PouchDB
