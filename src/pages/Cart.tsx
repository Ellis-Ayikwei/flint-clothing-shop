import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
}

const Cart = () => {
    const [cartItems, setCartItems] = React.useState<CartItem[]>([
        {
            id: 1,
            name: 'Premium Leather Jacket',
            price: 299.99,
            quantity: 1,
            size: 'M',
            color: 'Black',
            image: '/assets/images/products/leather-jacket.jpg',
        },
        // Add more items as needed
    ]);

    const updateQuantity = (id: number, change: number) => {
        setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)));
    };

    const removeItem = (id: number) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 15;
    const total = subtotal + shipping;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 min-h-screen bg-[#0A0A0A] text-white">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-[#141414] p-4 rounded-lg flex gap-4">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-400">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                    <p className="text-gray-400">
                                        Size: {item.size} | Color: {item.color}
                                    </p>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white/10 rounded">
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white/10 rounded">
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-[#141414] p-6 rounded-lg h-fit">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-white/10 pt-2 mt-2">
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-100 transition-colors">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Cart;
