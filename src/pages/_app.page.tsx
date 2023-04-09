import type { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/globals'
import { MyContextProvider } from '@/contexts/context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MyContextProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </MyContextProvider>
    </>
  )
}
