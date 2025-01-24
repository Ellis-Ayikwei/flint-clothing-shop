import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useWishlist } from '../../context/WishlistContext';
import { products } from '../../data/products';
import Price from '../common/Price';

const TrendingProducts = () => {
    const { addItem, isInWishlist } = useWishlist();
    const trendingProducts = products.slice(0, 4); // Get first 4 products for demo

    return (
        <section className="py-20 bg-white">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Trending Now</h2>
                    <p className="text-gray-600">Our most popular pieces this season</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {trendingProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Link to={`/product/${product.id}`}>
                                <div className="aspect-[3/4] overflow-hidden bg-white">
                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                </div>
                            </Link>

                            {/* Product Tags */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                {product.isNew && <span className="px-3 py-1 bg-black text-white text-sm font-semibold rounded-full">New</span>}
                                {product.isSale && <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">Sale</span>}
                            </div>

                            {/* Wishlist Button */}
                            <button
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
                                        {product.isSale ? (
                                            <>
                                                <span className="text-red-500 font-semibold">
                                                    <Price amount={product.salePrice || 0} />
                                                </span>
                                                <Price amount={product.price} className="text-gray-400" isStrikethrough />
                                            </>
                                        ) : (
                                            <span className="font-semibold text-gray-900">
                                                <Price amount={product.price} />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link to="/new-arrivals" className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-colors">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
