// npm
import Link from "next/link"

// self
import { db } from "../components/db-provider"

const PageDB2 = (props) => (
  <div>
    <h1>Page DB2</h1>
    <pre>{JSON.stringify(props, null, "  ")}</pre>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/db1">
          <a>Page db1</a>
        </Link>
      </li>
      <li>
        <Link href="/db2">
          <a>Page db2</a>
        </Link>
      </li>
    </ul>
  </div>
)

PageDB2.getInitialProps = () => db.allDocs({ include_docs: true })

export default PageDB2
