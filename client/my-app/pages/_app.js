// pages/_app.js
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import  {store}  from './redux/Store';


function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
       <Provider store={store}>
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      </Provider>
      <Footer />
    </div>
  );
}

export default MyApp;
