import '@/styles/globals.css'
import Layout from '@/components/layout'

export default function App({ Component, pageProps }) {
  // console.log('_app.js');
  // return <>Hello haha</>
  return <Layout><Component {...pageProps} /></Layout>
}
