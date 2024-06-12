import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props) {
  const { locale } = props.__NEXT_DATA__;
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <Html lang={locale} dir={dir}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
