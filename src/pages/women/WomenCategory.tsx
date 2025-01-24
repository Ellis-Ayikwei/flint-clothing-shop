import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRuler } from '@fortawesome/free-solid-svg-icons';
import { getProductsByCategory } from '../../data/products';
import { useWishlist } from '../../context/WishlistContext';
import SizeGuide from '../../components/SizeGuide';
import CategoryFilter from '../../components/common/CategoryFilter';
import Price from '../../components/common/Price';

const WomenCategory = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const { addItem: addToWishlist, isInWishlist } = useWishlist();
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['All', 'T-Shirts', 'Hoodies', 'Jackets', 'Pants', 'Dresses'];
    const products = getProductsByCategory('women', selectedCategory.toLowerCase());

    // Update selected category when URL parameter changes
    useEffect(() => {
        if (category) {
            const formattedCategory = category
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            setSelectedCategory(formattedCategory);
        } else {
            setSelectedCategory('All');
        }
    }, [category]);

    // Handle category change and update URL
    const handleCategoryChange = (newCategory: string) => {
        setSelectedCategory(newCategory);
        if (newCategory.toLowerCase() === 'all') {
            navigate('/women');
        } else {
            navigate(`/women/${newCategory.toLowerCase().replace(' ', '-')}`);
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-white">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Women's {selectedCategory !== 'All' ? selectedCategory : 'Collection'}</h1>
                    <button onClick={() => setIsSizeGuideOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <FontAwesomeIcon icon={faRuler} />
                        Size Guide
                    </button>
                </div>

                <CategoryFilter categories={categories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
                        <p className="text-gray-600">Try selecting a different category</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group relative bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                <motion.div className="aspect-[3/4] overflow-hidden bg-white" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                </motion.div>

                                {/* Product Tags */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {product.isNew && <span className="px-3 py-1 bg-black text-white text-sm font-semibold rounded-full">New</span>}
                                    {product.isSale && <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">Sale</span>}
                                </div>

                                {/* Wishlist Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToWishlist(product);
                                    }}
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
                                        <div className="text-sm text-gray-500">{product.inStock ? 'In Stock' : 'Out of Stock'}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <SizeGuide isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} category="women" />
        </div>
    );
};

export default WomenCategory;
