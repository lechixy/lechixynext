import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import 'styles/global.scss';
import { Util } from 'utils/Util';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Util.log("Hello, welcome to my page! Why are you checking the console? 🤔");
}, [])

  return (
    <Component {...pageProps} />
  )
}

export default MyApp
