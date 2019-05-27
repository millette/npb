// npm
import Link from 'next/link'

// self
import { CounterConsumer } from '../components/counter-provider'

export default () => <div>
  <h1>b</h1>

  <CounterConsumer>
    {({ count, increase, decrease }) => (
      <div>
        <p>Counter: {count}!</p>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
      </div>
    )}
  </CounterConsumer>

  <ul>
    <li><Link href='/'><a>Home</a></Link></li>
    <li><Link href="/b" as='/a'><a>Page a</a></Link></li>
    <li><Link href="/a" as='/b'><a>Page b</a></Link></li>
  </ul>
</div>
