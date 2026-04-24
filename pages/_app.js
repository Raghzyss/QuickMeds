import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}
