// npm
import Link from "next/link"
// import { Component } from "react"
import Router from "next/router"

// self
import { db } from "../components/db-provider"

const submit = (ev) => {
  ev.preventDefault()
  const fd = new window.FormData(ev.target)
  const name = fd.get("name")
  const _id = fd.get("id")
  const nDoc = {
    _id,
    name,
  }
  db.put(nDoc)
    .then((x) => {
      window.fetch("/db1", {
        method: "PUT",
        body: JSON.stringify(nDoc),
      })
    })
    .then(() =>
      Router.push(
        {
          pathname: "/db3",
          query: { id: _id },
        },
        `/db3/${_id}`
      )
    )
    .catch((e) => console.error("eee", e))
}

const PageNewDoc = (props) => (
  <div>
    <h1>New Doc</h1>
    <h3>Create</h3>
    <form onSubmit={submit}>
      <label>
        ID:
        <input type="text" name="id" />
      </label>
      <br />
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <br />
      <input type="submit" />
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

export default PageNewDoc
