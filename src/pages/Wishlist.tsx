import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingBag, faTrash } from '@fortawesome/free-solid-svg-icons';

interface WishlistItem {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    inStock: boolean;
}

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = React.useState<WishlistItem[]>([
        {
            id: 1,
            name: 'Premium Leather Jacket',
            price: 299.99,
            image: '/assets/images/products/leather-jacket.jpg',
            category: "Men's Outerwear",
            inStock: true,
        },
        {
            id: 2,
            name: 'Urban Cargo Pants',
            price: 89.99,
            image: '/assets/images/products/cargo-pants.jpg',
            category: "Men's Pants",
            inStock: false,
        },
        // Add more items as needed
    ]);

    const removeFromWishlist = (id: number) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    };

    const moveToCart = (id: number) => {
        // Implement cart functionality
        console.log('Moving to cart:', id);
        removeFromWishlist(id);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 min-h-screen bg-[#0A0A0A] text-white">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Wishlist</h1>
                    <span className="text-gray-400">{wishlistItems.length} items</span>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-16">
                        <FontAwesomeIcon icon={faHeart} className="w-16 h-16 text-gray-600 mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-400 mb-8">Browse our collections and find something you love</p>
                        <a href="/collections" className="inline-block bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
                            Explore Collections
                        </a>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {wishlistItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-[#141414] rounded-lg overflow-hidden"
                            >
                                <div className="flex items-center p-4">
                                    <div className="w-24 h-24 rounded-lg overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 ml-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold mb-1">{item.name}</h3>
                                                <p className="text-sm text-gray-400">{item.category}</p>
                                                <p className="text-lg font-semibold mt-2">${item.price}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => moveToCart(item.id)}
                                                    disabled={!item.inStock}
                                                    className={`px-6 py-2 rounded-full flex items-center gap-2 ${
                                                        item.inStock ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-800 text-gray-400 cursor-not-allowed'
                                                    } transition-colors`}
                                                >
                                                    <FontAwesomeIcon icon={faShoppingBag} />
                                                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                                                </button>
                                                <button onClick={() => removeFromWishlist(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Wishlist;
