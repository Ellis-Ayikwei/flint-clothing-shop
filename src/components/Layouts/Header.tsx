import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faShoppingBag, faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ContactModal from './ContactModal';
import CurrencySelector from '../common/CurrencySelector';
import OrderForMeModal from '../common/OrderForMeModal';
import { useCurrency } from '../../context/CurrencyContext';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [cartCount] = useState(2);
    const [wishlistCount] = useState(3);
    const location = useLocation();
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isOrderForMeOpen, setIsOrderForMeOpen] = useState(false);
    const { formatPrice } = useCurrency();

    // Calculate free shipping threshold based on current currency
    const freeShippingThreshold = 150; // Base USD amount
    const formattedShippingThreshold = formatPrice(freeShippingThreshold);

    const mainNavItems = [
        { name: 'New Arrivals', path: '/new-arrivals' },
        { name: 'All Products', path: '/products' },
        { name: 'Men', path: '/men' },
        { name: 'Women', path: '/women' },
        { name: 'Collections', path: '/collections' },
        { name: 'Sale', path: '/sale', highlight: true },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as Element).closest('.nav-item')) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Close dropdowns when route changes
    useEffect(() => {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
    }, [location.pathname, searchParams]);

    const handleDropdownToggle = (name: string, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const handleCartClick = () => navigate('/cart');
    const handleAccountClick = () => navigate('/account');

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md' : 'bg-transparent'}`}>
            {/* Announcement Bar */}
            <motion.div className="bg-[#0A0A0A] text-white py-2 text-center text-sm" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center justify-center gap-2">
                    <motion.p
                        key={formattedShippingThreshold} // Add key to trigger animation on currency change
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        Free Shipping on Orders Over {formattedShippingThreshold}
                    </motion.p>
                    <span className="mx-2">|</span>
                    <p>Shop Now Pay Later with Klarna</p>
                </div>
            </motion.div>

            <div className="max-w-screen-xl mx-auto px-4">
                <nav className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/assets/images/flinthead (3).png" alt="Flint Logo" className="h-8 w-auto brightness-0 invert" />
                        <span className="text-2xl font-bold tracking-tight text-white">FLINT</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {mainNavItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`text-sm font-medium hover:text-gray-300 transition-colors ${item.highlight ? 'text-red-500 hover:text-red-400' : 'text-white'}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <button onClick={() => setIsOrderForMeOpen(true)} className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
                            Order for Me
                        </button>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-6">
                        <CurrencySelector />
                        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-white hover:text-gray-300 transition-colors">
                            <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
                        </button>
                        <Link to="/wishlist" className="relative text-white hover:text-gray-300 transition-colors">
                            <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                            {wishlistCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{wishlistCount}</span>}
                        </Link>
                        <button onClick={handleAccountClick} className="text-white hover:text-gray-300 transition-colors">
                            <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                        </button>
                        <button onClick={handleCartClick} className="relative text-white hover:text-gray-300 transition-colors">
                            <FontAwesomeIcon icon={faShoppingBag} className="w-5 h-5" />
                            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
                        </button>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Search Bar */}
                <motion.div initial={false} animate={{ height: isSearchOpen ? 'auto' : 0, opacity: isSearchOpen ? 1 : 0 }} className="overflow-hidden">
                    <div className="py-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                            />
                            <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </motion.div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-md"
                        >
                            <div className="py-4">
                                {mainNavItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`block px-4 py-2 text-sm font-medium ${item.highlight ? 'text-red-500' : 'text-white'} hover:bg-white/10 transition-colors`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <OrderForMeModal isOpen={isOrderForMeOpen} onClose={() => setIsOrderForMeOpen(false)} />
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </header>
    );
};

export default Header;
