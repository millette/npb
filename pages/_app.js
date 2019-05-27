// npm
import App, { Container } from 'next/app'

// self
/* First we import our provider */
import CounterProvider from '../components/counter-provider'

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        {/* Then we wrap our components with the provider */}
        <CounterProvider>
          <Component {...pageProps} />
        </CounterProvider>
      </Container>
    )
  }
}

export default MyApp
