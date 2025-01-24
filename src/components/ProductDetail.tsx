'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faRuler, faArrowLeft, faShoppingBag, faTruck, faRotateLeft, faShield } from '@fortawesome/free-solid-svg-icons';
import { getProductById, getRelatedProducts } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import SizeGuide from './SizeGuide';
import Price from './common/Price';
import Toast from './common/Toast';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const product = getProductById(Number(id));
    const { addItem: addToWishlist, isInWishlist } = useWishlist();
    const { addItem: addToCart } = useCart();

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const [mainImage, setMainImage] = useState(product?.images[0] || '');
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [activeTab, setActiveTab] = useState('description');
    const [relatedProducts] = useState(() => getRelatedProducts(product?.category || 'men', product?.id || 0));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="pt-24 min-h-screen bg-white">
                <div className="max-w-screen-xl mx-auto px-4 py-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
                    <Link to="/" className="text-gray-600 hover:text-gray-900 mt-4 inline-block">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            setToastMessage('Please select size and color');
            setShowToast(true);
            return;
        }
        addToCart({ ...product, quantity, size: selectedSize, color: selectedColor, image: mainImage });
        setToastMessage('Added to cart successfully!');
        setShowToast(true);
    };

    const handleQuantityChange = (value: number) => {
        if (value < 1) return;
        if (value > 10) return;
        setQuantity(value);
    };

    return (
        <div className="pt-24 min-h-screen bg-white">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                {/* Back Button */}
                <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Back
                </button>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <motion.div className="aspect-square rounded-xl overflow-hidden bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
                        </motion.div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setMainImage(image)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                                        mainImage === image ? 'border-gray-900' : 'border-transparent'
                                    } hover:border-gray-300 transition-colors`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 text-sm mb-2">
                                <Link to={`/${product.category}`} className="text-gray-600 hover:text-gray-900">
                                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                </Link>
                                <span className="text-gray-400">/</span>
                                <Link to={`/${product.category}/${product.subCategory}`} className="text-gray-600 hover:text-gray-900">
                                    {product.subCategory.charAt(0).toUpperCase() + product.subCategory.slice(1)}
                                </Link>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <div className="flex items-center gap-4">
                                {product.isSale ? (
                                    <>
                                        <span className="text-2xl font-bold text-red-500">
                                            <Price amount={product.salePrice || 0} />
                                        </span>
                                        <Price amount={product.price} className="text-xl text-gray-400" isStrikethrough />
                                        <span className="bg-red-100 text-red-500 px-2 py-1 rounded-full text-sm">
                                            {Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)}% OFF
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-2xl font-bold text-gray-900">
                                        <Price amount={product.price} />
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200">
                            <div className="flex gap-8">
                                <button
                                    onClick={() => setActiveTab('description')}
                                    className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'description' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Description
                                    {activeTab === 'description' && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" layoutId="activeTab" />}
                                </button>
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'details' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Details
                                    {activeTab === 'details' && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" layoutId="activeTab" />}
                                </button>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                                {activeTab === 'description' ? (
                                    <p className="text-gray-600">{product.description}</p>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FontAwesomeIcon icon={faTruck} />
                                            <span>Free shipping on orders over ₵200</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FontAwesomeIcon icon={faRotateLeft} />
                                            <span>30-day return policy</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <FontAwesomeIcon icon={faShield} />
                                            <span>2-year warranty</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Size Selection */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-900">Select Size</h3>
                                <button onClick={() => setIsSizeGuideOpen(true)} className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faRuler} />
                                    Size Guide
                                </button>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {product.sizes.map((size) => (
                                    <motion.button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-2 rounded-lg border ${
                                            selectedSize === size ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-900 text-gray-900'
                                        } transition-colors`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {size}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div>
                            <h3 className="font-semibold mb-2 text-gray-900">Select Color</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {product.colors.map((color) => (
                                    <motion.button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`py-2 rounded-lg border ${
                                            selectedColor === color ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-900 text-gray-900'
                                        } transition-colors`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {color}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <h3 className="font-semibold mb-2 text-gray-900">Quantity</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                                    className="w-16 h-10 rounded-lg border border-gray-200 text-center text-gray-900 focus:outline-none focus:border-gray-900"
                                />
                                <button
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <motion.button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className="w-full bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FontAwesomeIcon icon={faShoppingBag} />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </motion.button>

                        {/* Wishlist */}
                        <motion.button
                            // onClick={() => addToWishlist(product)}
                            className={`w-full border py-3 rounded-full transition-colors flex items-center justify-center gap-2 ${
                                isInWishlist(product.id) ? 'border-red-500 text-red-500 hover:bg-red-50' : 'border-gray-200 text-gray-900 hover:border-gray-900'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FontAwesomeIcon icon={faHeart} />
                            {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </motion.button>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {relatedProducts.map((relatedProduct) => (
                                <motion.div key={relatedProduct.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                                    <Link to={`/product/${relatedProduct.id}`} className="block">
                                        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-50 mb-4">
                                            <img
                                                src={relatedProduct.images[0]}
                                                alt={relatedProduct.name}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <h3 className="text-gray-900 font-medium mb-1">{relatedProduct.name}</h3>
                                        <Price amount={relatedProduct.price} className="text-gray-600" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <SizeGuide isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} category={product.category} />

            <AnimatePresence>{showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}</AnimatePresence>
        </div>
    );
};

export default ProductDetail;
