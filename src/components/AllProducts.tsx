import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import { Product, products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import Price from './common/Price';

type SortOption = 'newest' | 'price-low' | 'price-high';
type FilterOptions = {
    category: string[];
    priceRange: [number, number];
    sizes: string[];
    colors: string[];
};

const AllProducts = () => {
    const { addItem: addToWishlist, isInWishlist } = useWishlist();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [filters, setFilters] = useState<FilterOptions>({
        category: [],
        priceRange: [0, 500],
        sizes: [],
        colors: [],
    });

    // Get unique values for filter options
    const categories = Array.from(new Set(products.map((p) => p.category)));
    const sizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
    const colors = Array.from(new Set(products.flatMap((p) => p.colors)));
    const maxPrice = Math.max(...products.map((p) => p.price));

    useEffect(() => {
        let result = [...products];

        // Apply filters
        if (filters.category.length > 0) {
            result = result.filter((p) => filters.category.includes(p.category));
        }
        if (filters.sizes.length > 0) {
            result = result.filter((p) => p.sizes.some((size) => filters.sizes.includes(size)));
        }
        if (filters.colors.length > 0) {
            result = result.filter((p) => p.colors.some((color) => filters.colors.includes(color)));
        }
        result = result.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

        // Apply sorting
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
        }

        setFilteredProducts(result);
    }, [filters, sortBy]);

    const toggleFilter = (type: keyof FilterOptions, value: string) => {
        setFilters((prev) => {
            if (type === 'priceRange') {
                return prev; // Don't modify price range with this function
            }
            return {
                ...prev,
                [type]: prev[type].includes(value) ? prev[type].filter((v) => v !== value) : [...prev[type], value],
            };
        });
    };

    return (
        <div className="pt-24 min-h-screen bg-white">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">All Products</h1>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                            <FontAwesomeIcon icon={faFilter} />
                            Filters
                        </button>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors focus:outline-none"
                        >
                            <option value="newest">Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Filters Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-8">
                            <div className="bg-gray-50 p-6 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-6">
                                {/* Category Filter */}
                                <div>
                                    <h3 className="font-semibold mb-3">Category</h3>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <label key={category} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.category.includes(category)}
                                                    onChange={() => toggleFilter('category', category)}
                                                    className="rounded text-gray-900 focus:ring-gray-900"
                                                />
                                                <span className="capitalize">{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Size Filter */}
                                <div>
                                    <h3 className="font-semibold mb-3">Size</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        {sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => toggleFilter('sizes', size)}
                                                className={`py-1 px-2 rounded ${filters.sizes.includes(size) ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-100'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Filter */}
                                <div>
                                    <h3 className="font-semibold mb-3">Color</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => toggleFilter('colors', color)}
                                                className={`py-1 px-2 rounded ${filters.colors.includes(color) ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-100'}`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range Filter */}
                                <div>
                                    <h3 className="font-semibold mb-3">Price Range</h3>
                                    <div className="space-y-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max={maxPrice}
                                            value={filters.priceRange[1]}
                                            onChange={(e) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    priceRange: [prev.priceRange[0], Number(e.target.value)],
                                                }))
                                            }
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-sm">
                                            <span>₵0</span>
                                            <span>Up to ₵{filters.priceRange[1]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
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
                                onClick={() =>
                                    addToWishlist({
                                        ...product,
                                        image: product.images[0],
                                    })
                                }
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

                {/* No Results Message */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
                        <p className="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
