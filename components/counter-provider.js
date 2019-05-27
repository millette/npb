import { createContext, useState } from "react"

const CounterContext = createContext()

const CounterProvider = (props) => {
  const [count, setCount] = useState(0)
  return (
    <CounterContext.Provider
      value={{
        count,
        increase: () => setCount(count + 1),
        decrease: () => setCount(count - 1),
        increaseBy: (val) => setCount(count + val),
      }}
    >
      {props.children}
    </CounterContext.Provider>
  )
}

const CounterConsumer = CounterContext.Consumer

export default CounterProvider
export { CounterConsumer }
