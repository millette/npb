// npm
import { createContext, useState, useEffect } from "react"
// import { createContext } from "react"

// self
import PouchDB from "../lib/pouchdb.js"

const CounterContext = createContext()

const db = new PouchDB("whatwhat")

const CounterProvider = ({ children }) => {
  const [dbResponse, setDbResponse] = useState()

  useEffect(() => {
    console.log("EFFF")
    db.allDocs().then(setDbResponse)
  }, [])

  // const [count, setCount] = useState(0)
  // const [db, setDb] = useState(PouchDB && new PouchDB('whatwhat'))
  // const [db] = useState(PouchDB && new PouchDB("whatwhat"))
  // const [db] = useState(new PouchDB("whatwhat"))
  // console.log("DB", db)
  return (
    <CounterContext.Provider
      value={{
        dbResponse,
        db,
        count: db,
        /*
        allDocs: () => {
          db.allDocs()
            .then((docs) => {
              setDbResponse(docs)
            })
        },
        */
        increase: () => {}, // setCount(count + 1),
        decrease: () => {}, // setCount(count - 1),
        increaseBy: (val) => {}, // setCount(count + val),
      }}
    >
      {children}
    </CounterContext.Provider>
  )
}

const CounterConsumer = CounterContext.Consumer

export default CounterProvider
export { CounterConsumer, CounterContext, db }
