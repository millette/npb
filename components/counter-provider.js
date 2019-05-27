// npm
import { createContext, useState } from "react"

// self
import PouchDB from "../lib/pouchdb.js"

const CounterContext = createContext()

const CounterProvider = ({ children }) => {
  // const [count, setCount] = useState(0)
  // const [db, setDb] = useState(PouchDB && new PouchDB('whatwhat'))
  const [db] = useState(PouchDB && new PouchDB("whatwhat"))
  // console.log("DB", db)
  return (
    <CounterContext.Provider
      value={{
        count: db,
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
export { CounterConsumer }
