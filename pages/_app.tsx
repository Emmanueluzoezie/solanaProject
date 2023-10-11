import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import store from '../app/store'
import client from "../apollo-client"

export default function App({ Component, pageProps }: AppProps) {
  
  return(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  )
}
