import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/128/2875/2875878.png" /> {/* Agar favicon.ico bo'lsa */}
       
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
