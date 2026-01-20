import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="theme-color" content="#00fff8"></meta>
                    <meta property="og:title" content="lechixy"></meta>
                    <meta property="og:image" content="https://lechixy.dev/favicon.ico"></meta>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
                    </style>
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
