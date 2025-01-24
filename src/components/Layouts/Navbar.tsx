import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { items: cartItems } = useCart();
    const { items: wishlistItems } = useWishlist();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'New Arrivals', path: '/new-arrivals' },
        { name: 'All Products', path: '/products' },
        {
            name: 'Men',
            path: '/men',
            subLinks: [
                { name: 'T-Shirts', path: '/men/t-shirts' },
                { name: 'Hoodies', path: '/men/hoodies' },
                { name: 'Jackets', path: '/men/jackets' },
                { name: 'Pants', path: '/men/pants' },
            ],
        },
        {
            name: 'Women',
            path: '/women',
            subLinks: [
                { name: 'T-Shirts', path: '/women/t-shirts' },
                { name: 'Hoodies', path: '/women/hoodies' },
                { name: 'Jackets', path: '/women/jackets' },
                { name: 'Pants', path: '/women/pants' },
            ],
        },
        { name: 'Collections', path: '/collections' },
        { name: 'Sale', path: '/sale' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'}`}>
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-gray-900">
                        LOGO
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                <Link to={link.path} className={`text-sm font-medium transition-colors hover:text-gray-900 ${location.pathname === link.path ? 'text-gray-900' : 'text-gray-600'}`}>
                                    {link.name}
                                </Link>
                                {link.subLinks && (
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="py-2">
                                            {link.subLinks.map((subLink) => (
                                                <Link key={subLink.path} to={subLink.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    {subLink.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        <Link to="/wishlist" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <FontAwesomeIcon icon={faHeart} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{wishlistItems.length}</span>
                            )}
                        </Link>
                        <Link to="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{cartItems.length}</span>
                            )}
                        </Link>
                        <Link to="/account" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t">
                        <div className="px-4 py-2 space-y-1">
                            {navLinks.map((link) => (
                                <React.Fragment key={link.name}>
                                    <Link to={link.path} className="block py-2 text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsOpen(false)}>
                                        {link.name}
                                    </Link>
                                    {link.subLinks && (
                                        <div className="pl-4 space-y-1">
                                            {link.subLinks.map((subLink) => (
                                                <Link
                                                    key={subLink.path}
                                                    to={subLink.path}
                                                    className="block py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {subLink.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
