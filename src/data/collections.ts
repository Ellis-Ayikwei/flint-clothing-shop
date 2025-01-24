import { Collection } from '../types/collection';

export const collections: Collection[] = [
    {
        id: 'summer',
        title: 'Summer Essentials',
        description: 'Light and breathable pieces for the warm season. Our summer collection features lightweight fabrics, relaxed fits, and vibrant colors perfect for sunny days.',
        image: '/assets/images/collections/summer.jpg',
        heroImage: '/assets/images/collections/summer-hero.jpg',
        products: [1, 2, 5, 13, 14, 22], // Product IDs from products.ts
        theme: {
            primaryColor: '#F9BC60',
            secondaryColor: '#FF8C42',
        },
    },
    {
        id: 'street',
        title: 'Urban Streetwear',
        description: 'Modern street style for everyday comfort. Bold designs meet practical comfort in our urban streetwear collection.',
        image: '/assets/images/collections/street.jpg',
        heroImage: '/assets/images/collections/street-hero.jpg',
        products: [3, 4, 6, 11, 16, 17],
        theme: {
            primaryColor: '#2D3142',
            secondaryColor: '#4F5D75',
        },
    },
    {
        id: 'minimal',
        title: 'Minimalist Collection',
        description: 'Clean designs for a timeless wardrobe. Focusing on essential pieces with premium quality and perfect fits.',
        image: '/assets/images/collections/minimal.jpg',
        heroImage: '/assets/images/collections/minimal-hero.jpg',
        products: [7, 8, 10, 19, 20, 23],
        theme: {
            primaryColor: '#EAE8E8',
            secondaryColor: '#B8B8B8',
        },
    },
];

export const getCollectionById = (id: string): Collection | undefined => {
    return collections.find((collection) => collection.id === id);
};
