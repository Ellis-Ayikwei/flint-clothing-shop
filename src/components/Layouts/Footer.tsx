import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#0A0A0A] text-white py-4">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center md:text-left">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/assets/images/flinthead (3).png" alt="Flint Logo" className="h-8 w-auto brightness-0 invert" />
                            <span className="text-2xl font-bold tracking-tight">FLINT</span>
                        </Link>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center text-sm text-gray-400">
                        <p>
                            Built with <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" /> by{' '}
                            <a href="https://tradehutgh.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors font-medium">
                                Trade Hut Ghana
                            </a>
                        </p>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
