import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faHeart, faShoppingBag, faSignOut, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Settings from '../../components/common/Settings';
import Price from '../../components/common/Price';

interface Order {
    id: string;
    date: string;
    status: string;
    total: number;
    items: number;
}

interface WishlistItem {
    id: number;
    name: string;
    price: number;
    image: string;
}

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);

    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 890',
        avatar: '/assets/images/user/avatar.jpg',
        address: '123 Street Name, City, Country',
    };

    const orders: Order[] = [
        { id: '#ORD001', date: '2024-03-15', status: 'Delivered', total: 299.99, items: 3 },
        { id: '#ORD002', date: '2024-03-10', status: 'In Transit', total: 149.99, items: 2 },
        { id: '#ORD003', date: '2024-03-05', status: 'Processing', total: 89.99, items: 1 },
    ];

    const wishlistItems: WishlistItem[] = [
        { id: 1, name: 'Premium Leather Jacket', price: 299.99, image: '/assets/images/products/leather-jacket.jpg' },
        { id: 2, name: 'Urban Cargo Pants', price: 89.99, image: '/assets/images/products/cargo-pants.jpg' },
        { id: 3, name: 'Oversized Graphic Hoodie', price: 79.99, image: '/assets/images/products/hoodie.jpg' },
    ];

    const tabs = [
        { id: 'profile', name: 'Profile', icon: faUser },
        { id: 'orders', name: 'Orders', icon: faShoppingBag },
        { id: 'wishlist', name: 'Wishlist', icon: faHeart },
        { id: 'settings', name: 'Settings', icon: faCog },
    ];

    const renderProfileContent = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
                    <div>
                        <h3 className="text-xl font-semibold">{user.name}</h3>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>
                <button onClick={() => setIsEditing(!isEditing)} className="text-blue-600 hover:text-blue-700">
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Edit Profile
                </button>
            </div>

            {isEditing ? (
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" defaultValue={user.name} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" defaultValue={user.email} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input type="tel" defaultValue={user.phone} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea defaultValue={user.address} className="w-full p-2 border rounded-lg" rows={3} />
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900">
                            Save Changes
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                        <p>{user.phone}</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">Address</h4>
                        <p>{user.address}</p>
                    </div>
                </div>
            )}
        </div>
    );

    const renderOrdersContent = () => (
        <div className="space-y-6">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{order.items} items</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Price amount={order.total} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderWishlistContent = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlistItems.map((item) => (
                <div key={item.id} className="flex bg-white rounded-lg overflow-hidden border">
                    <img src={item.image} alt={item.name} className="w-32 h-32 object-cover" />
                    <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <Price amount={item.price} className="text-gray-600" />
                        </div>
                        <div className="flex justify-between items-center">
                            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 text-sm">Add to Cart</button>
                            <button className="text-red-500 hover:text-red-600">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return renderProfileContent();
            case 'orders':
                return renderOrdersContent();
            case 'wishlist':
                return renderWishlistContent();
            case 'settings':
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="md:w-64">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                            activeTab === tab.id ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={tab.icon} />
                                        <span>{tab.name}</span>
                                    </button>
                                ))}
                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                                    <FontAwesomeIcon icon={faSignOut} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6">{tabs.find((tab) => tab.id === activeTab)?.name}</h2>
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
