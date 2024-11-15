// pages/_app.js
import Navbar from './components/navbar';
import Footer from './components/footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
