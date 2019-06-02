// npm
import Link from "next/link"

// self
import { db } from "../components/db-provider"

const Pages = ({ rows }) => (
  <div>
    <h1>Pages</h1>
    {rows.map(({ doc: { _id, _rev, name, ...rest } }) => (
      <div key={_id}>
        <h2>
          <Link href={`/db3?id=${_id}`} as={`/db3/${_id}`}>
            <a>{name || <i>{_id}</i>}</a>
          </Link>
        </h2>
        <dl>
          <dt>id</dt>
          <dd>{_id}</dd>
          <dt>rev</dt>
          <dd>{_rev}</dd>
          {rest && (
            <>
              <dt>rest</dt>
              <dd>
                <pre>{JSON.stringify(rest, null, "  ")}</pre>
              </dd>
            </>
          )}
        </dl>
      </div>
    ))}

    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/pages">
          <a>Pages</a>
        </Link>
      </li>
    </ul>
  </div>
)

Pages.getInitialProps = () => db.allDocs({ include_docs: true })

export default Pages
