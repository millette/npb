// import React, { createContext, Component } from 'react'
import { createContext, Component } from 'react'

// const CounterContext = React.createContext()
const CounterContext = createContext()

class CounterProvider extends Component {
  state = {
    count: 0
  }

  increase = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  increaseBy = val => {
    this.setState({
      count: this.state.count + val
    })
  }

  decrease = () => {
    this.setState({
      count: this.state.count - 1
    })
  }

  render () {
    return (
      <CounterContext.Provider
        value={{
          count: this.state.count,
          increase: this.increase,
          decrease: this.decrease,
          increaseBy: this.increaseBy
        }}
      >
        {this.props.children}
      </CounterContext.Provider>
    )
  }
}

/* then make a consumer which will surface it */
const CounterConsumer = CounterContext.Consumer

export default CounterProvider
export { CounterConsumer }
