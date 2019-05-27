// npm
import Link from "next/link"
// import jsonC from 'json-cycle'

// self
// import PouchDB from '../lib/pouchdb-browser.js'
// import PouchDB from '../lib/pouchdb.js'
import { CounterConsumer } from "../components/counter-provider"

const Index = (props) => (
  <>
    <h1>HOME</h1>
    <CounterConsumer>
      {({ count, increase, decrease }) => (
        <div>
          <p>Counter: {count}</p>
          <button onClick={increase}>Increase</button>
          <button onClick={decrease}>Decrease</button>
        </div>
      )}
    </CounterConsumer>
    <ul>
      <li>
        <Link href="/b" as="/a">
          <a>a</a>
        </Link>
      </li>
      <li>
        <Link href="/a" as="/b">
          <a>b</a>
        </Link>
      </li>
    </ul>
  </>
)

//     <pre>{jsonC.stringify(props.alldbs, null, '  ')}</pre>

// const db = PouchDB ? new PouchDB('booya') : 'SKIPPED'
// const db = new PouchDB('booya')
// const db = 'SKIPPED'
/*
const Index = (props) => (
  <div>
  </div>
)
*/

/*
Index.getInitialProps = (o) => {
  const { req, query } = o
  const isServer = !!req
  console.log('getInitialProps called:', isServer ? 'server' : 'client', typeof query, query)
  if (isServer) return query

  // const db = new PouchDB('booya')
  return PouchDB.allDbs()
    .then((alldbs) => ({alldbs}))
}
*/

export default Index
