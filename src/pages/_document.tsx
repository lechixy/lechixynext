import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (    
            <Html lang="en">
                <Head>
                    <meta name="theme-color" content="#00fff8"></meta>
                    <meta property="og:title" content="lechixy"></meta>
                    <meta property="og:image" content="https://lechixy.netlify.app/favicon.ico"></meta>
                </Head>
                <NextScript />
                <body>
                    <Main />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
