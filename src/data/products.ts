export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    images: string[];
    category: 'men' | 'women';
    subCategory: 't-shirts' | 'hoodies' | 'jackets' | 'pants' | 'dresses' | 'activewear';
    sizes: string[];
    colors: string[];
    isNew?: boolean;
    isSale?: boolean;
    salePrice?: number;
    inStock: boolean;
}

export const products: Product[] = [
    // Men's T-Shirts
    {
        id: 1,
        name: 'Essential Cotton T-Shirt',
        price: 29.99,
        description: 'Premium cotton t-shirt with a relaxed fit, perfect for everyday wear.',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3'],
        category: 'men',
        subCategory: 't-shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Navy', 'Gray'],
        isNew: true,
        inStock: true,
    },
    {
        id: 2,
        name: 'Graphic Print T-Shirt',
        price: 34.99,
        description: 'Urban style graphic t-shirt with custom artwork.',
        images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3'],
        category: 'men',
        subCategory: 't-shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White'],
        inStock: true,
    },
    {
        id: 3,
        name: 'Oversized Streetwear Tee',
        price: 39.99,
        description: 'Oversized fit t-shirt with dropped shoulders.',
        images: ['https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3'],
        category: 'men',
        subCategory: 't-shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Beige', 'Gray'],
        isSale: true,
        salePrice: 29.99,
        inStock: true,
    },

    // Men's Hoodies
    {
        id: 4,
        name: 'Essential Zip Hoodie',
        price: 69.99,
        description: 'Classic zip-up hoodie with premium cotton blend.',
        images: ['https://images.unsplash.com/photo-1509942774463-acf339cf87d5?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?ixlib=rb-4.0.3'],
        category: 'men',
        subCategory: 'hoodies',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Gray', 'Navy'],
        inStock: true,
    },
    {
        id: 5,
        name: 'Oversized Pullover Hoodie',
        price: 79.99,
        description: 'Comfortable oversized hoodie with kangaroo pocket.',
        images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3'],
        category: 'men',
        subCategory: 'hoodies',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Cream', 'Olive'],
        isNew: true,
        inStock: true,
    },
    {
        id: 6,
        name: 'Tech Fleece Hoodie',
        price: 89.99,
        description: 'Technical fleece hoodie with modern details.',
        images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3'],
        category: 'men',
        subCategory: 'hoodies',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Gray'],
        isSale: true,
        salePrice: 69.99,
        inStock: true,
    },

    // Men's Jackets
    {
        id: 7,
        name: 'Premium Leather Jacket',
        price: 299.99,
        description: 'Genuine leather jacket with a timeless design.',
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3'],
        category: 'men',
        subCategory: 'jackets',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Brown'],
        isNew: true,
        inStock: true,
    },
    {
        id: 8,
        name: 'Denim Trucker Jacket',
        price: 89.99,
        description: 'Classic denim jacket with a modern fit.',
        images: ['https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1591213954196-2d0ccb3f8d4c?ixlib=rb-4.0.3'],
        category: 'men',
        subCategory: 'jackets',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blue', 'Black', 'Light Wash'],
        inStock: true,
    },
    {
        id: 9,
        name: 'Bomber Jacket',
        price: 129.99,
        description: 'Classic bomber jacket with ribbed cuffs and hem.',
        images: ['/assets/images/products/men/jackets/bomber-1.jpg'],
        category: 'men',
        subCategory: 'jackets',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Olive', 'Navy'],
        isSale: true,
        salePrice: 99.99,
        inStock: true,
    },

    // Men's Pants
    {
        id: 10,
        name: 'Slim Fit Chinos',
        price: 59.99,
        description: 'Classic chinos with a modern slim fit.',
        images: ['/assets/images/products/men/pants/chinos-1.jpg'],
        category: 'men',
        subCategory: 'pants',
        sizes: ['30', '32', '34', '36'],
        colors: ['Khaki', 'Navy', 'Olive'],
        inStock: true,
    },
    {
        id: 11,
        name: 'Cargo Tech Pants',
        price: 89.99,
        description: 'Technical cargo pants with multiple pockets.',
        images: ['/assets/images/products/men/pants/cargo-1.jpg'],
        category: 'men',
        subCategory: 'pants',
        sizes: ['30', '32', '34', '36'],
        colors: ['Black', 'Olive'],
        isNew: true,
        inStock: true,
    },
    {
        id: 12,
        name: 'Relaxed Fit Jeans',
        price: 79.99,
        description: 'Comfortable relaxed fit jeans in premium denim.',
        images: ['/assets/images/products/men/pants/jeans-1.jpg'],
        category: 'men',
        subCategory: 'pants',
        sizes: ['30', '32', '34', '36'],
        colors: ['Blue', 'Black', 'Light Wash'],
        isSale: true,
        salePrice: 59.99,
        inStock: true,
    },

    // Women's T-Shirts
    {
        id: 13,
        name: 'Cropped Basic Tee',
        price: 24.99,
        description: 'Cropped t-shirt with a slim fit.',
        images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3'],
        category: 'women',
        subCategory: 't-shirts',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['White', 'Black', 'Pink', 'Gray'],
        isNew: true,
        inStock: true,
    },
    {
        id: 14,
        name: 'Oversized Graphic Tee',
        price: 34.99,
        description: 'Oversized t-shirt with artistic graphics.',
        images: ['/assets/images/products/women/t-shirts/graphic-1.jpg'],
        category: 'women',
        subCategory: 't-shirts',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['White', 'Black'],
        inStock: true,
    },
    {
        id: 15,
        name: 'Cropped Cotton Tee',
        price: 24.99,
        description: 'Stylish cropped t-shirt made from soft cotton fabric.',
        images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-4.0.3'],
        category: 'women',
        subCategory: 't-shirts',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['White', 'Black', 'Pink', 'Sage'],
        isNew: true,
        inStock: true,
    },

    // Women's Hoodies
    {
        id: 16,
        name: 'Cropped Hoodie',
        price: 59.99,
        description: 'Cropped hoodie with raw hem detail.',
        images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1529144415895-6222f9ec7e2f?ixlib=rb-4.0.3'],
        category: 'women',
        subCategory: 'hoodies',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Black', 'Gray', 'Pink'],
        isNew: true,
        inStock: true,
    },
    {
        id: 17,
        name: 'Oversized Comfort Hoodie',
        price: 69.99,
        description: 'Ultra-comfortable oversized hoodie.',
        images: ['/assets/images/products/women/hoodies/comfort-1.jpg'],
        category: 'women',
        subCategory: 'hoodies',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Cream', 'Gray', 'Black'],
        inStock: true,
    },
    {
        id: 18,
        name: 'Zip-Up Sport Hoodie',
        price: 74.99,
        description: 'Athletic zip-up hoodie with thumb holes.',
        images: ['/assets/images/products/women/hoodies/sport-1.jpg'],
        category: 'women',
        subCategory: 'hoodies',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Black', 'Gray', 'Blue'],
        isSale: true,
        salePrice: 59.99,
        inStock: true,
    },

    // Women's Jackets
    {
        id: 19,
        name: 'Cropped Denim Jacket',
        price: 79.99,
        description: 'Cropped denim jacket with distressed details.',
        images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3'],
        category: 'women',
        subCategory: 'jackets',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Light Blue', 'Black', 'White'],
        isNew: true,
        inStock: true,
    },
    {
        id: 20,
        name: 'Faux Leather Biker Jacket',
        price: 89.99,
        description: 'Edgy biker jacket in vegan leather.',
        images: ['/assets/images/products/women/jackets/biker-1.jpg'],
        category: 'women',
        subCategory: 'jackets',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Black', 'Brown'],
        inStock: true,
    },
    {
        id: 21,
        name: 'Oversized Blazer',
        price: 99.99,
        description: 'Oversized blazer with modern tailoring.',
        images: ['/assets/images/products/women/jackets/blazer-1.jpg'],
        category: 'women',
        subCategory: 'jackets',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Black', 'Beige', 'Gray'],
        isSale: true,
        salePrice: 79.99,
        inStock: true,
    },

    // Women's Pants
    {
        id: 22,
        name: 'High-Waist Cargo Pants',
        price: 69.99,
        description: 'High-waisted cargo pants with utility pockets.',
        images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3'],
        category: 'women',
        subCategory: 'pants',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Black', 'Beige', 'Olive'],
        isNew: true,
        inStock: true,
    },
    {
        id: 23,
        name: 'Wide Leg Trousers',
        price: 79.99,
        description: 'Flowy wide-leg trousers with pleated detail.',
        images: ['/assets/images/products/women/pants/wide-1.jpg'],
        category: 'women',
        subCategory: 'pants',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Black', 'Cream', 'Brown'],
        inStock: true,
    },
    {
        id: 24,
        name: 'Mom Fit Jeans',
        price: 84.99,
        description: 'Classic mom jeans with a high waist.',
        images: ['/assets/images/products/women/pants/mom-1.jpg'],
        category: 'women',
        subCategory: 'pants',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Blue', 'Light Wash', 'Black'],
        isSale: true,
        salePrice: 69.99,
        inStock: true,
    },

    // New Arrivals
    {
        id: 25,
        name: 'Limited Edition Jacket',
        price: 199.99,
        description: 'Exclusive new season jacket with modern details.',
        images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1591047139756-eec307b1b7d7?ixlib=rb-4.0.3'],
        category: 'men',
        subCategory: 'jackets',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Brown'],
        isNew: true,
        inStock: true,
    },

    // Sale Products
    {
        id: 26,
        name: 'Summer Collection Dress',
        price: 129.99,
        description: 'Lightweight summer dress with floral pattern.',
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3'],
        category: 'women',
        subCategory: 'dresses',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Floral Print', 'Blue Print'],
        isSale: true,
        salePrice: 79.99,
        inStock: true,
    },
    {
        id: 27,
        name: 'Premium Denim Collection',
        price: 89.99,
        description: 'High-quality denim jeans with perfect fit.',
        images: ['https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3'],
        category: 'men',
        subCategory: 'pants',
        sizes: ['30', '32', '34', '36'],
        colors: ['Blue', 'Black'],
        isSale: true,
        salePrice: 59.99,
        inStock: true,
    },
    {
        id: 28,
        name: 'Athletic Performance Set',
        price: 149.99,
        description: 'Complete athletic set for high-performance training.',
        images: ['https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-4.0.3', 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixlib=rb-4.0.3'],
        category: 'men',
        subCategory: 'activewear',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Gray'],
        isSale: true,
        salePrice: 99.99,
        inStock: true,
    },
];

export const getProductsByCategory = (category: 'men' | 'women', subCategory?: string) => {
    if (!subCategory || subCategory.toLowerCase() === 'all') {
        return products.filter((product) => product.category === category);
    }
    return products.filter((product) => product.category === category && product.subCategory.toLowerCase() === subCategory.toLowerCase());
};

export const getNewArrivals = () => {
    return products.filter((product) => product.isNew);
};

export const getProductById = (id: number) => {
    return products.find((product) => product.id === id);
};

export const getSaleProducts = () => {
    return products.filter((product) => product.isSale);
};

export const getRelatedProducts = (category: string, currentProductId: number) => {
    return products.filter((product) => product.category === category && product.id !== currentProductId).slice(0, 4);
};
