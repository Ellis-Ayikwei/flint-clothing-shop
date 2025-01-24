import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useWishlist } from '../context/WishlistContext';
import { getNewArrivals } from '../data/products';
import Price from '../components/common/Price';

const NewArrivals = () => {
    const { addItem, isInWishlist } = useWishlist();
    const newArrivals = getNewArrivals();

    return (
        <div className="pt-24 min-h-screen bg-white">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">New Arrivals</h1>
                    <p className="text-gray-600">Discover our latest collection</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {newArrivals.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Link to={`/product/${product.id}`}>
                                <div className="aspect-[3/4] overflow-hidden bg-white">
                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                </div>
                            </Link>

                            {/* Product Tags */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className="px-3 py-1 bg-black text-white text-sm font-semibold rounded-full">New</span>
                                {product.isSale && <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">Sale</span>}
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
            </div>
        </div>
    );
};

export default NewArrivals;
