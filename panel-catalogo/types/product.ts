export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    category: {
        name: string;
        slug: string;
    };
    images: string[];
    tags?: string[];
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
