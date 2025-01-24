import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import { getCollectionById } from '../../data/collections';
import { getProductById } from '../../data/products';
import { useWishlist } from '../../context/WishlistContext';
import Price from '../../components/common/Price';

const CollectionPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem, isInWishlist } = useWishlist();
    const collection = getCollectionById(id || '');

    if (!collection) {
        return (
            <div className="pt-24 min-h-screen bg-[#0A0A0A] text-white">
                <div className="max-w-screen-xl mx-auto px-4 py-8 text-center">
                    <h1 className="text-3xl font-bold mb-4">Collection Not Found</h1>
                    <Link to="/collections" className="text-gray-400 hover:text-white">
                        View all collections
                    </Link>
                </div>
            </div>
        );
    }

    const collectionProducts = collection.products.map((id) => getProductById(id)).filter(Boolean);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#0A0A0A] text-white">
            {/* Hero Section */}
            <div
                className="h-[70vh] relative flex items-center justify-center"
                style={{
                    backgroundImage: `url(${collection.heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
                    <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl md:text-6xl font-bold mb-4">
                        {collection.title}
                    </motion.h1>
                    <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-gray-200">
                        {collection.description}
                    </motion.p>
                </div>
                <button onClick={() => navigate(-1)} className="absolute top-8 left-8 text-white hover:text-gray-300 transition-colors">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back
                </button>
            </div>

            {/* Products Grid */}
            <div className="max-w-screen-xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collectionProducts.map((product, index) => (
                        <motion.div
                            key={product?.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-[#141414] rounded-lg overflow-hidden"
                        >
                            <Link to={`/product/${product?.id}`}>
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img src={product?.images[0]} alt={product?.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                </div>
                            </Link>

                            {/* Product Tags */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                {product?.isNew && <span className="px-3 py-1 bg-white text-black text-sm font-semibold rounded-full">New</span>}
                                {product?.isSale && <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">Sale</span>}
                            </div>

                            {/* Wishlist Button */}
                            <button
                                onClick={() => product && addItem(product)}
                                className={`absolute top-4 right-4 p-2 rounded-full ${
                                    product && isInWishlist(product.id) ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-red-500'
                                } transition-colors`}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>

                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-1">{product?.name}</h3>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        {product?.isSale ? (
                                            <>
                                                <span className="text-red-500 font-semibold">
                                                    <Price amount={product.salePrice || 0} />
                                                </span>
                                                <Price amount={product.price} className="text-gray-400" isStrikethrough />
                                            </>
                                        ) : (
                                            <span className="font-semibold">
                                                <Price amount={product?.price || 0} />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default CollectionPage;
