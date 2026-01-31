import { Package } from 'lucide-react';
import Image from 'next/image';
import connectToDatabase from '@/lib/db';
import ProductModel from '@/models/Product';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import ProductDetailModal from './components/ProductDetailModal';
import NewProductModal from './components/NewProductModal';
import { Product } from '@/types/product';

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
                    <h1 className="text-3xl font-black tracking-tight dark:text-white mb-1">Productos</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Gestiona tu catálogo de belleza.</p>
                </div>
                <NewProductModal />
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {products.map((product: Product) => (
                    <ProductDetailModal key={product._id} product={product}>
                        <Card className="group relative bg-white dark:bg-[#0f172a] border-none shadow-md shadow-black/5 dark:shadow-none dark:bg-linear-to-b dark:from-[#1e293b] dark:to-[#0f172a] overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                            {/* Image Container */}
                            <div className="relative h-48 w-full bg-gray-50 dark:bg-[#1e293b]/50 overflow-hidden">
                                {product.images?.[0] ? (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-300 dark:text-gray-600">
                                        <Package className="w-10 h-10 mb-2 opacity-20" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Sin imagen</span>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
                            </div>

                            {/* Content Container */}
                            <div className="p-4 space-y-3">
                                <div className="space-y-0.5">
                                    <span className="text-[9px] font-black text-[#26c6da] uppercase tracking-widest leading-none">
                                        {product.category?.name || 'Cosmético'}
                                    </span>
                                    <h3 className="text-base font-black dark:text-white leading-tight line-clamp-1 group-hover:text-[#26c6da] transition-colors">
                                        {product.name}
                                    </h3>
                                </div>

                                <div className="flex justify-between items-center pt-1 border-t border-gray-100 dark:border-white/5">
                                    <p className="text-lg font-black text-[#26c6da]">{formatCurrency(product.price)}</p>

                                    <span className={`px-2 py-0.5 ${product.isActive !== false ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'} text-[8px] font-black uppercase tracking-wider rounded-md`}>
                                        {product.isActive !== false ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </ProductDetailModal>
                ))}

                {products.length === 0 && (
                    <div className="col-span-full py-16 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 mb-4">
                            <Package className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                        </div>
                        <h2 className="text-lg font-bold dark:text-white">Aún no hay productos</h2>
                        <p className="text-sm text-gray-400 mt-1">Comienza agregando tu primer producto.</p>
                    </div>
                )}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-100 dark:border-white/5 font-bold text-[10px] text-gray-400 tracking-wider gap-4">
                <p>Mostrando {products.length} productos</p>
                <div className="flex gap-2">
                    <button disabled className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 text-primary">1</button>
                </div>
            </div>
        </div>
    );
}
