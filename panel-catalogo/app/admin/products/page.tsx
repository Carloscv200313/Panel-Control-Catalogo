import Image from 'next/image';
import connectToDatabase from '@/lib/db';
import ProductModel from '@/models/Product';
import NewProductModal from './components/NewProductModal';
import ProductsGrid from './components/ProductsGrid';

async function getProducts() {
    await connectToDatabase();
    const products = await ProductModel.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="space-y-6 pb-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-1">Productos</h1>
                    <p className="text-sm text-slate-500 font-medium">Gestiona tu catálogo de belleza.</p>
                </div>
                <NewProductModal />
            </div>

            <ProductsGrid products={products} />
        </div>
    );
}
