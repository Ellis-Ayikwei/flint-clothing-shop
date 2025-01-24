import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SizeGuideProps {
    isOpen: boolean;
    onClose: () => void;
    category: 'men' | 'women';
}

const SizeGuide: React.FC<SizeGuideProps> = ({ isOpen, onClose, category }) => {
    const sizeCharts = {
        men: {
            measurements: ['Chest', 'Waist', 'Hip', 'Length'],
            sizes: {
                S: ['36-38"', '30-32"', '36-38"', '27"'],
                M: ['38-40"', '32-34"', '38-40"', '28"'],
                L: ['40-42"', '34-36"', '40-42"', '29"'],
                XL: ['42-44"', '36-38"', '42-44"', '30"'],
            },
        },
        women: {
            measurements: ['Bust', 'Waist', 'Hip', 'Length'],
            sizes: {
                XS: ['32-34"', '24-26"', '34-36"', '25"'],
                S: ['34-36"', '26-28"', '36-38"', '26"'],
                M: ['36-38"', '28-30"', '38-40"', '27"'],
                L: ['38-40"', '30-32"', '40-42"', '28"'],
            },
        },
    };

    const chart = sizeCharts[category];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-[#141414] p-6 rounded-lg max-w-2xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-6">Size Guide - {category.charAt(0).toUpperCase() + category.slice(1)}</h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="p-3">Size</th>
                                        {chart.measurements.map((measurement) => (
                                            <th key={measurement} className="p-3">
                                                {measurement}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(chart.sizes).map(([size, measurements]) => (
                                        <tr key={size} className="border-b border-white/10">
                                            <td className="p-3 font-semibold">{size}</td>
                                            {measurements.map((measurement, index) => (
                                                <td key={index} className="p-3">
                                                    {measurement}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 space-y-4">
                            <h3 className="font-semibold">How to Measure</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>• Chest/Bust: Measure around the fullest part</li>
                                <li>• Waist: Measure around your natural waistline</li>
                                <li>• Hip: Measure around the fullest part of your hips</li>
                                <li>• Length: Measure from shoulder to hem</li>
                            </ul>
                        </div>

                        <button onClick={onClose} className="mt-6 w-full bg-white text-black py-3 rounded-full hover:bg-gray-100 transition-colors">
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SizeGuide;
