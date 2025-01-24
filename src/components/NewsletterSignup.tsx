import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Stay in the Loop</h2>
                        <p className="text-gray-600 mb-8">Subscribe to our newsletter for exclusive offers, new arrivals, and fashion inspiration.</p>
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-gray-400 flex-1 max-w-md"
                                disabled={status === 'loading' || status === 'success'}
                            />
                            <button type="submit" disabled={status === 'loading' || status === 'success'} className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-colors">
                                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>

                        {status === 'success' && (
                            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-500 mt-4">
                                Thank you for subscribing!
                            </motion.p>
                        )}

                        <p className="text-sm text-gray-500 mt-4">
                            By subscribing you agree to receive marketing notifications.
                            <br />
                            Don't worry, you can unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSignup;
