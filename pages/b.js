// npm
import Link from "next/link"
// import { useContext } from "react"

// self
// import { CounterConsumer, CounterContext, db } from "../components/counter-provider"
import { CounterConsumer, db } from "../components/counter-provider"

const PageB = (props) => {
  // const oy = useContext(CounterContext)
  console.log("PageB", props)
  // console.log('OY', oy)
  // console.log('CounterContext', CounterContext)

  return (
    <div>
      <h1>b</h1>
      <pre>Props: {JSON.stringify(props, null, "  ")}</pre>

      <CounterConsumer>
        {({ dbResponse }) => (
          <div>
            <pre>Docs: {JSON.stringify(dbResponse, null, "  ")}</pre>
          </div>
        )}
      </CounterConsumer>

      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/b" as="/a">
            <a>Page a</a>
          </Link>
        </li>
        <li>
          <Link href="/a" as="/b">
            <a>Page b</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

PageB.getInitialProps = (o) => {
  const { req, query } = o
  const isServer = !!req
  console.log(
    "PageB.getInitialProps called:",
    isServer ? "server" : "client",
    typeof query,
    query
  )

  return db.post({ it: "is" }).then(() => db.allDocs())
  /*
    .then(() => {
      return {}
    })
  */
}

export default PageB
