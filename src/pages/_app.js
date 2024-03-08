import '../styles/globals.css';
import Layout from '../components/Layout';
import { MantineProvider } from '@mantine/core';

function App({ Component, pageProps }) {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </MantineProvider>
    )
}

export default App;
