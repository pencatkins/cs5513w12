import '../styles/globals.css';
import '../styles/bootstrap.min.css';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout home>
    <Component {...pageProps} />
    </Layout>
    );
}

export default MyApp
