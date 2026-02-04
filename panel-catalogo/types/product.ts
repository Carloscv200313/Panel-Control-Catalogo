export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    categories?: string[];
    category?: {
        name: string;
        slug: string;
    };
    images: string[];
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
}
