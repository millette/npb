// npm
import App, { Container } from "next/app"

// self
import CounterProvider from "../components/counter-provider"

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <CounterProvider>
          <Component {...pageProps} />
        </CounterProvider>
      </Container>
    )
  }
}

export default MyApp
