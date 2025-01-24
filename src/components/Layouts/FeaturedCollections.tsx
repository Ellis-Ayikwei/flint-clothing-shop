import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collections } from '../../data/collections';

const FeaturedCollections = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Featured Collections</h2>
                    <p className="text-gray-600">Discover our carefully curated collections</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-xl aspect-[3/4] shadow-lg"
                        >
                            <img src={collection.image} alt={collection.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="text-2xl font-bold mb-2 text-white">{collection.title}</h3>
                                    <p className="text-gray-200 mb-6">{collection.description}</p>
                                    <Link to={`/collections/${collection.id}`} className="inline-block bg-white text-black px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
                                        Explore Collection
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollections;
