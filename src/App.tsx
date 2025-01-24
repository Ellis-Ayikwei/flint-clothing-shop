import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Layouts/Header';
import { routes } from './router/routes';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UserPreferencesProvider } from './context/UserPreferencesContext';
import Footer from './components/Layouts/Footer';
import { CurrencyProvider } from './context/CurrencyContext';
import { ReactNode } from 'react';

interface AppProps {
    children?: ReactNode;
}

function App({ children }: AppProps) {
    const location = useLocation();

    return (
        <CurrencyProvider>
            <UserPreferencesProvider>
                <CartProvider>
                    <WishlistProvider>
                        <Header />
                        {children}
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                {routes.map((route) => (
                                    <Route key={route.path} path={route.path} element={route.element} />
                                ))}
                            </Routes>
                        </AnimatePresence>
                        <Footer />
                    </WishlistProvider>
                </CartProvider>
            </UserPreferencesProvider>
        </CurrencyProvider>
    );
}

export default App;
