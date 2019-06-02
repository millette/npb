// npm
import Link from "next/link"
import { Component } from "react"
import stringify from "fast-json-stable-stringify"

// self
import { db } from "../components/db-provider"

// const docName = "demo666"

class PageDB3 extends Component {
  constructor(props) {
    // console.log("ctor", props)
    super(props)
    this.state = {}
    // this.state = { doc: props.doc }
    this.submit = this.submit.bind(this)
  }

  static getInitialProps(a) {
    // console.log('getInitialProps', Object.keys(a))
    // const { pathname, query, asPath, req, res, ...rest } = a
    const { query } = a
    /*
    console.log("getInitialProps-pathname", pathname)
    console.log("getInitialProps-query", query)
    console.log("getInitialProps-asPath", asPath)
    console.log("getInitialProps-rest", rest)
    // console.log("getInitialProps-req", req && Object.keys(req))
    */
    // console.log("getInitialProps-res", res && Object.keys(res))
    return (
      db
        // .get(docName) // 79b54fc9-1f8d-4563-9482-ae2a6a18aad9
        .get(query.id) // 79b54fc9-1f8d-4563-9482-ae2a6a18aad9
        .then((doc) => ({ doc }))
        .catch((e) => {
          // console.error('OUILLE', e)
          if (e.status === 404) return { _id: query.id, doc: false }
          throw e
        })
    )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    /*
    console.log('getDerivedStateFromProps')
    console.log('nextProps', nextProps)
    console.log('prevState', prevState)
    */

    if (
      prevState &&
      prevState.doc &&
      !nextProps.doc &&
      prevState.doc._id === nextProps._id
    )
      return { doc: prevState.doc }

    if (
      prevState &&
      prevState.doc &&
      nextProps.doc &&
      prevState.doc._id === nextProps.doc._id
    )
      return null

    // console.log('SET NEW DOC', nextProps.doc)
    return { doc: nextProps.doc }
  }

  submit(ev) {
    // console.log('SUBMIT-props', this.props)
    const { _id } = this.props
    const doc = this.state.doc || {}
    ev.preventDefault()
    const fd = new window.FormData(ev.target)
    const name = fd.get("name")
    const nDoc = {
      _id,
      // _id: docName,
      ...doc,
      name,
    }
    console.log("PUTTING", nDoc)
    db.put(nDoc)
      .then((x) => {
        // nDoc._rev = x.rev
        this.setState({
          doc: {
            ...nDoc,
            _rev: x.rev,
          },
        })
        window.fetch("/db1", {
          method: "PUT",
          body: JSON.stringify(nDoc),
        })
      })
      .catch((e) => console.error("eee", e))
  }

  render() {
    const { doc } = this.state
    return (
      <div>
        <h1>Page DB3</h1>
        <h2>Doc {doc && `${doc.name} - ${doc._id}`}</h2>
        {doc ? <pre>{stringify(doc, { space: 2 })}</pre> : <p>No doc yet.</p>}
        <h3>{doc ? "Edit" : "Create"}</h3>
        <form onSubmit={this.submit}>
          <label>
            Name:
            <input type="text" name="name" defaultValue={doc ? doc._id : ""} />
          </label>
        </form>
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
  }
}

export default PageDB3
