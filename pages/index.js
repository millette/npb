// npm
import Link from "next/link"
import stringify from "fast-json-stable-stringify"

// self
import { db } from "../components/db-provider"

const Pages = ({ rows }) => (
  <div>
    <h1>Pages</h1>
    <ul>
      <li>
        <Link href="/new-doc">
          <a>New doc</a>
        </Link>
      </li>
    </ul>
    {rows.length ? (
      rows.map(({ doc: { _id, _rev, name, ...rest } }) => (
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
            {Object.keys(rest).length > 0 && (
              <>
                <dt>rest</dt>
                <dd>
                  <pre>{stringify(rest, { space: 2 })}</pre>
                </dd>
              </>
            )}
          </dl>
        </div>
      ))
    ) : (
      <div>No docs.</div>
    )}
  </div>
)

Pages.getInitialProps = () => db.allDocs({ include_docs: true })

export default Pages
