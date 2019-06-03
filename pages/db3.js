// npm
import Link from "next/link"
import { Component } from "react"
import stringify from "fast-json-stable-stringify"

// self
import { db } from "../components/db-provider"

class PageDB3 extends Component {
  constructor(props) {
    console.log("ctor", props)
    super(props)
    this.state = {}
    this.submit = this.submit.bind(this)
  }

  static getInitialProps(a) {
    const { query } = a

    if (!query.id) throw new Error("Niet!")

    return db.get(query.id).then((doc) => ({ doc }))
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
        <h2>
          Doc {doc.name} - {doc._id}
        </h2>
        <pre>{stringify(doc, { space: 2 })}</pre>
        <h3>Edit</h3>
        <form onSubmit={this.submit}>
          <label>
            Name:
            <input type="text" name="name" defaultValue={doc.name || ""} />
          </label>
        </form>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/new-doc">
              <a>New doc</a>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default PageDB3
