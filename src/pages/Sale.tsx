import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTag, faShippingFast, faClock, faRotateLeft, faShield } from '@fortawesome/free-solid-svg-icons';
import { useWishlist } from '../context/WishlistContext';
import { getSaleProducts } from '../data/products';
import Price from '../components/common/Price';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const Sale = () => {
    const { addItem, isInWishlist } = useWishlist();
    const saleProducts = getSaleProducts();

    return (
        <div className="pt-24 min-h-screen bg-white">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Sale</h1>
                    <p className="text-gray-600">Limited time offers on selected items</p>
                </motion.div>

                {/* Sale Banner */}
                <div className="relative overflow-hidden mb-16">
                    <motion.div
                        className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Ambient Background Elements */}
                        <motion.div
                            className="absolute inset-0 overflow-hidden"
                            animate={{
                                background: [
                                    'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 70%)',
                                    'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.1) 0%, transparent 70%)',
                                ],
                            }}
                            transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
                        >
                            <motion.div
                                className="absolute -top-8 -right-8 w-48 h-48 bg-white/10 rounded-full blur-2xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute -bottom-8 -left-8 w-48 h-48 bg-black/10 rounded-full blur-2xl"
                                animate={{
                                    scale: [1.2, 1, 1.2],
                                    opacity: [0.5, 0.3, 0.5],
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-400/20 rounded-full blur-3xl"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.2, 0.4, 0.2],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </motion.div>

                        <div className="relative px-8 py-16 text-white text-center">
                            <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ duration: 0.6 }}>
                                <motion.h2
                                    className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
                                    animate={{
                                        textShadow: ['0 0 8px rgba(255,255,255,0.4)', '0 0 16px rgba(255,255,255,0.2)', '0 0 8px rgba(255,255,255,0.4)'],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    End of Season Sale
                                </motion.h2>
                                <motion.div className="w-24 h-1 bg-white/50 mx-auto mb-6 rounded-full" animate={{ scaleX: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                                <p className="text-xl md:text-2xl mb-12 text-white/90">Up to 50% off on selected items</p>
                            </motion.div>

                            <motion.div className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-3xl mx-auto" variants={staggerContainer} initial="initial" animate="animate">
                                <motion.div variants={fadeInUp} initial="initial" animate="animate" className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                                    <FontAwesomeIcon icon={faTag} className="text-2xl" />
                                    <span className="font-semibold whitespace-nowrap">Up to 50% Off</span>
                                </motion.div>
                                <motion.div variants={fadeInUp} initial="initial" animate="animate" className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                                    <FontAwesomeIcon icon={faShippingFast} className="text-2xl" />
                                    <span className="font-semibold whitespace-nowrap">Free Shipping</span>
                                </motion.div>
                                <motion.div variants={fadeInUp} initial="initial" animate="animate" className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                                    <FontAwesomeIcon icon={faClock} className="text-2xl" />
                                    <span className="font-semibold whitespace-nowrap">Limited Time</span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Products Grid */}
                <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerContainer} initial="initial" animate="animate">
                    {saleProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            variants={fadeInUp}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="group relative bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Link to={`/product/${product.id}`}>
                                <div className="aspect-[3/4] overflow-hidden bg-white">
                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                </div>
                            </Link>

                            {/* Discount Tag */}
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                                    {Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)}% OFF
                                </span>
                            </div>

                            {/* Wishlist Button */}
                            <button
                                onClick={() => addItem(product)}
                                className={`absolute top-4 right-4 p-2 rounded-full ${
                                    isInWishlist(product.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-900 hover:bg-red-500 hover:text-white'
                                } shadow-sm transition-all duration-300`}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>

                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-1 text-gray-900">{product.name}</h3>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-500 font-semibold">
                                            <Price amount={product.salePrice || 0} />
                                        </span>
                                        <Price amount={product.price} className="text-gray-400" isStrikethrough />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Sale Info Section */}
                <motion.div className="mt-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div whileHover={{ scale: 1.05 }} className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
                            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <FontAwesomeIcon icon={faShippingFast} className="text-2xl text-gray-900" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">Free Shipping</h3>
                            <p className="text-gray-600">On all sale items above ₵200</p>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
                            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <FontAwesomeIcon icon={faRotateLeft} className="text-2xl text-gray-900" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">Easy Returns</h3>
                            <p className="text-gray-600">30-day return policy</p>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl text-center shadow-sm hover:shadow-md transition-all">
                            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <FontAwesomeIcon icon={faShield} className="text-2xl text-gray-900" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">Secure Payment</h3>
                            <p className="text-gray-600">100% secure checkout</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Sale;
