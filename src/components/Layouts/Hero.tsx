'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './jh.css';
import ContactModal from './ContactModal';
import LookbookModal from '../common/LookbookModal';

const heroImages = [
    {
        src: '/assets/images/models/model-1.jpg',
        alt: 'Urban streetwear collection',
        position: 'translate-x-[10%] translate-y-[5%]',
    },
    {
        src: '/assets/images/models/model-2.png',
        alt: 'Premium winter collection',
        position: '-translate-x-[15%] translate-y-[15%]',
    },
    {
        src: '/assets/images/models/model-3.png',
        alt: 'Designer essentials',
        position: 'translate-x-[5%] -translate-y-[10%]',
    },
];

export default function Hero() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isLookbookOpen, setIsLookbookOpen] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        // Preload images
        const loadImages = async () => {
            try {
                await Promise.all(
                    heroImages.map(
                        (image) =>
                            new Promise((resolve, reject) => {
                                const img = new Image();
                                img.src = image.src;
                                img.onload = resolve;
                                img.onerror = reject;
                            })
                    )
                );
                setImagesLoaded(true);
            } catch (error) {
                console.error('Error loading images:', error);
                // Set loaded anyway to show something
                setImagesLoaded(true);
            }
        };

        loadImages();
    }, []);

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        if (!imagesLoaded) return;

        gsap.from('.hero-content', {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.hero-content',
                start: 'top 80%',
            },
        });

        gsap.from('.hero-image', {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
        });
    }, [imagesLoaded]); // Add imagesLoaded as dependency

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-white">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] to-black opacity-90" />
                <div className="absolute inset-0 bg-[url('/assets/patterns/grid.svg')] opacity-[0.03]" />

                {/* Animated Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
                <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-rose-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
            </div>

            {/* Main Content */}
            <div className="relative max-w-screen-xl mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                    {/* Text Content */}
                    <div className="hero-content space-y-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3">
                            <img src="/assets/images/flinthead (3).png" alt="Flint Logo" className="h-12 w-auto brightness-0 invert" />
                            <span className="text-3xl font-bold text-white">FLINT</span>
                        </motion.div>
                        <motion.span className="text-sm font-medium tracking-widest text-gray-400 uppercase" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                            FW 2024 Collection
                        </motion.span>
                        <motion.h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                            DEFINE <br />
                            YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">STYLE</span>
                        </motion.h1>
                        <motion.p className="text-gray-400 text-lg md:text-xl max-w-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                            Elevate your wardrobe with our premium streetwear essentials. Each piece is crafted with attention to detail and contemporary design.
                        </motion.p>

                        <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
                            <a href="#collection" className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105">
                                Explore Collection
                            </a>
                            <button onClick={() => setIsLookbookOpen(true)} className="px-8 py-4 border border-white rounded-full hover:bg-white/10 transition-all transform hover:scale-105">
                                View Lookbook
                            </button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
                            <div>
                                <div className="text-3xl font-bold">50+</div>
                                <div className="text-sm text-gray-400">New Products</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">90%</div>
                                <div className="text-sm text-gray-400">Sustainable</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">24/7</div>
                                <div className="text-sm text-gray-400">Support</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image Grid */}
                    <div className="relative h-[600px] hidden lg:block">
                        {imagesLoaded &&
                            heroImages.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className={`hero-image absolute w-72 h-96 rounded-lg overflow-hidden ${image.position}`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: 0.5 + index * 0.2,
                                        duration: 0.8,
                                        ease: 'easeOut',
                                    }}
                                >
                                    <div className="relative w-full h-full">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover"
                                            style={{ opacity: 1 }} // Ensure image is visible
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-400">Scroll to explore</span>
                        <div className="w-0.5 h-12 bg-gradient-to-b from-white to-transparent" />
                    </div>
                </motion.div>
            </div>

            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
            <LookbookModal isOpen={isLookbookOpen} onClose={() => setIsLookbookOpen(false)} />
        </section>
    );
}
