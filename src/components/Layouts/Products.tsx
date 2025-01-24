import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart, faShippingFast, faShoppingBag, faTag } from '@fortawesome/free-solid-svg-icons';
import PromoCarousel from './PromoCarousel';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import PresaleBanner from '../common/PresaleBanner';

interface Currency {
    code: string;
    symbol: string;
    rate: number; // Exchange rate relative to USD
}

const currencies: { [key: string]: Currency } = {
    USD: { code: 'USD', symbol: '$', rate: 1 },
    EUR: { code: 'EUR', symbol: '€', rate: 0.85 },
    GBP: { code: 'GBP', symbol: '£', rate: 0.73 },
    JPY: { code: 'JPY', symbol: '¥', rate: 110.42 },
    GHS: { code: 'GHS', symbol: '₵', rate: 12.5 },
    NGN: { code: 'NGN', symbol: '₦', rate: 850 },
    KES: { code: 'KES', symbol: 'KSh', rate: 150 },
    ZAR: { code: 'ZAR', symbol: 'R', rate: 19.2 },
};

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    colors: string[];
    sizes: string[];
    tag?: string;
    description: string;
    isNew?: boolean;
    discount?: number;
}

const products: Product[] = [
    {
        id: 1,
        name: 'Premium Leather Jacket',
        price: 299.99,
        image: '/assets/images/products/leather-jacket.jpg',
        category: 'Outerwear',
        colors: ['Black', 'Brown', 'Cognac'],
        sizes: ['S', 'M', 'L', 'XL'],
        tag: 'Best Seller',
        description: 'Handcrafted from genuine leather with a timeless design',
        isNew: true,
    },
    {
        id: 2,
        name: 'Urban Cargo Pants',
        price: 89.99,
        image: '/assets/images/products/cargo-pants.jpg',
        category: 'Pants',
        colors: ['Black', 'Olive', 'Khaki'],
        sizes: ['30', '32', '34', '36'],
        description: 'Functional cargo pants with a modern streetwear twist',
    },
    {
        id: 3,
        name: 'Oversized Graphic Hoodie',
        price: 79.99,
        image: '/assets/images/products/hoodie.jpg',
        category: 'Sweatshirts',
        colors: ['Black', 'Grey', 'Navy'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        tag: 'Limited Edition',
        description: 'Premium cotton blend hoodie with unique graphic design',
    },
    {
        id: 4,
        name: 'Essential Cotton T-Shirt',
        price: 34.99,
        image: '/assets/images/products/tshirt.jpg',
        category: 'T-Shirts',
        colors: ['White', 'Black', 'Grey', 'Navy'],
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Premium cotton t-shirt with a relaxed fit',
        isNew: true,
    },
    {
        id: 5,
        name: 'Wool Blend Overcoat',
        price: 249.99,
        image: '/assets/images/products/overcoat.jpg',
        category: 'Outerwear',
        colors: ['Camel', 'Black', 'Grey'],
        sizes: ['S', 'M', 'L', 'XL'],
        tag: 'Premium',
        description: 'Luxurious wool blend coat for a sophisticated look',
    },
    {
        id: 6,
        name: 'Distressed Denim Jeans',
        price: 119.99,
        image: '/assets/images/products/jeans.jpg',
        category: 'Pants',
        colors: ['Light Blue', 'Dark Blue', 'Black'],
        sizes: ['28', '30', '32', '34', '36'],
        description: 'Vintage-inspired denim with modern details',
    },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const formatPrice = (price: number, currency: Currency) => {
    const convertedPrice = price * currency.rate;
    return `${currency.symbol}${convertedPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [likedProducts, setLikedProducts] = useState<number[]>([]);
    const { formatPrice } = useCurrency();
    const { addItem } = useCart();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const categories = ['All', 'Outerwear', 'Sweatshirts', 'T-Shirts', 'Pants'];
    const filteredProducts = selectedCategory === 'All' ? products : products.filter((product) => product.category === selectedCategory);

    const toggleLike = (productId: number) => {
        setLikedProducts((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
    };

    function addToCart(product: Product): void {
        throw new Error('Function not implemented.');
    }

    return (
        <>
            <PromoCarousel />
            <section className="py-24 bg-[#C4C3C3FF] text-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <PresaleBanner />

                    {/* Section Header */}
                    <motion.div className="text-center mb-16" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeInUp} ref={ref}>
                        <span className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-4 block">Our Collection</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Products</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Discover our carefully curated collection of premium streetwear essentials</p>
                    </motion.div>

                    {/* Category Filter */}
                    <div className="flex justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                                    selectedCategory === category ? 'bg-white text-black' : 'bg-transparent border border-gray-700 hover:border-white'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                className="product-card group relative bg-[#141414] hover:bg-[#1a1a1a] transition-colors rounded-lg overflow-hidden border border-white/[0.05]"
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                            >
                                <div className="aspect-[3/4] overflow-hidden bg-[#1a1a1a] relative">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                    {product.discount && <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">-{product.discount}%</div>}
                                </div>

                                {/* Product Info */}
                                <div className="p-6 bg-gradient-to-b from-[#141414] to-[#1a1a1a]">
                                    <div className="mb-4">
                                        <span className="text-sm text-gray-400">{product.category}</span>
                                        <h3 className="text-xl font-semibold text-white/90">{product.name}</h3>
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="text-xl font-semibold text-white/90">{formatPrice(product.price * (1 - (product.discount || 0) / 100))}</span>
                                            {product.discount && <span className="text-sm text-gray-400 line-through">{formatPrice(product.price)}</span>}
                                        </div>
                                    </div>

                                    {/* Product Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleLike(product.id)}
                                            className={`p-3 rounded-lg flex-shrink-0 transition-colors ${
                                                likedProducts.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-red-500'
                                            }`}
                                        >
                                            <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="flex-grow bg-white text-black rounded-lg font-semibold py-3 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FontAwesomeIcon icon={faShoppingBag} />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative overflow-hidden mb-16 mt-16">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 transform -skew-y-3"></div>
                        <div className="relative bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-24 -translate-x-24"></div>

                            <div className="relative px-8 py-12 md:py-16 text-white">
                                <div className="max-w-3xl mx-auto text-center space-y-8">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                        <h2 className="text-4xl md:text-6xl font-bold mb-4">End of Season Sale</h2>
                                        <p className="text-xl md:text-2xl mb-8 text-white/90">Up to 50% off on selected items</p>
                                    </motion.div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                                        >
                                            <FontAwesomeIcon icon={faTag} className="text-2xl mb-2" />
                                            <p className="font-semibold">Up to 50% Off</p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                                        >
                                            <FontAwesomeIcon icon={faShippingFast} className="text-2xl mb-2" />
                                            <p className="font-semibold">Free Shipping</p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                                        >
                                            <FontAwesomeIcon icon={faClock} className="text-2xl mb-2" />
                                            <p className="font-semibold">Limited Time</p>
                                        </motion.div>
                                    </div>

                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
                                        <button className="bg-white text-red-500 px-8 py-3 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors">Shop Now</button>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                <div className="absolute top-4 left-4 w-24 h-24 border-2 border-white/20 rounded-full"></div>
                                <div className="absolute bottom-4 right-4 w-32 h-32 border-2 border-white/20 rounded-full"></div>
                                <div className="absolute top-1/2 left-1/2 w-48 h-48 border-2 border-white/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                        </div>
                    </div>
                    <PresaleBanner />
                </div>
            </section>
        </>
    );
};

export default Products;
