export interface Collection {
    id: string;
    title: string;
    description: string;
    image: string;
    heroImage: string;
    products: number[]; // Product IDs
    theme: {
        primaryColor: string;
        secondaryColor: string;
    };
}
