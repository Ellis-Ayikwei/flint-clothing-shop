import React from 'react';
import { motion } from 'framer-motion';

const Collections = () => {
    const collections = [
        {
            name: 'Winter 2024',
            image: '/assets/images/collections/winter.jpg',
            description: 'Embrace the cold in style',
        },
        {
            name: 'Street Essential',
            image: '/assets/images/collections/street.jpg',
            description: 'Urban comfort meets style',
        },
        {
            name: 'Minimalist',
            image: '/assets/images/collections/minimal.jpg',
            description: 'Less is more',
        },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 min-h-screen bg-[#0A0A0A] text-white">
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">Collections</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative overflow-hidden rounded-lg aspect-[3/4] bg-[#111111] hover:bg-[#151515] transition-colors"
                        >
                            <img src={collection.image} alt={collection.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                                    <p className="text-gray-300 mb-4">{collection.description}</p>
                                    <button className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors">Explore Collection</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Collections;
