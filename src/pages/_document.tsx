import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" />
                    <meta name="theme-color" content="#574e63"></meta>
                    <meta property="og:title" content="lechixy"></meta>
                    <meta property="og:image" content="https://lechixy.netlify.app/favicon.ico"></meta>
                </Head>
                <NextScript />
                <body>
                    <Main />
                </body>
            </Html>
        )
    }
}

export default MyDocument;