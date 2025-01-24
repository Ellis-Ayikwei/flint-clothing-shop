'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PromoItem {
    text: string;
    link: string;
    color: string;
}

const promoItems: PromoItem[] = [
    {
        text: 'NEW SEASON ARRIVALS | Up to 40% Off',
        link: '/new-arrivals',
        color: 'bg-rose-950',
    },
    {
        text: 'FREE SHIPPING ON ORDERS OVER $150',
        link: '/shipping',
        color: 'bg-neutral-950',
    },
    {
        text: 'BECOME A MEMBER | Get 15% Off',
        link: '/membership',
        color: 'bg-zinc-950',
    },
    {
        text: 'STUDENT DISCOUNT | Extra 10% Off',
        link: '/student-discount',
        color: 'bg-stone-950',
    },
    {
        text: 'LIMITED TIME | Winter Collection Sale',
        link: '/sale',
        color: 'bg-slate-950',
    },
];

const PromoCarousel = () => {
    const [position, setPosition] = useState(0);
    const [items, setItems] = useState([...promoItems, ...promoItems]); // Duplicate items for seamless loop

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prev) => {
                if (prev === -(promoItems.length * 100)) {
                    return 0;
                }
                return prev - 100;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Reset position when it reaches the end
    useEffect(() => {
        if (position === -(promoItems.length * 100)) {
            setTimeout(() => {
                setPosition(0);
            }, 500);
        }
    }, [position]);

    return (
        <div className="relative overflow-hidden bg-black py-2">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: `${position}%`,
                }}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                }}
            >
                {items.map((item, index) => (
                    <div key={index} className={`inline-flex min-w-full justify-center items-center ${item.color} px-4 py-2`}>
                        <a href={item.link} className="text-white text-sm md:text-base font-medium hover:text-gray-200 transition-colors flex items-center gap-2">
                            {item.text}
                            <span className="text-xs border-b border-white/50">Shop Now</span>
                        </a>
                    </div>
                ))}
            </motion.div>

            {/* Gradient Overlays */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent" />
        </div>
    );
};

export default PromoCarousel;
