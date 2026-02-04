'use client';

import { useMemo, useState } from 'react';
import { Package, Search } from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { getCategoryLabel, slugifyCategoryName } from '@/lib/categories';
import ProductDetailModal from './ProductDetailModal';
import { Product } from '@/types/product';

type ProductsGridProps = {
    products: Product[];
};

export default function ProductsGrid({ products }: ProductsGridProps) {
    const [query, setQuery] = useState('');

    const filteredProducts = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) return products;

        return products.filter((product) => {
            const categories =
                product.categories && product.categories.length > 0
                    ? product.categories
                    : product.category?.slug
                        ? [product.category.slug]
                        : product.category?.name
                            ? [slugifyCategoryName(product.category.name)]
                            : [];
            const categoryLabels = categories.map((category) => getCategoryLabel(category));
            const haystack = [
                product.name,
                product.description,
                ...categoryLabels,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return haystack.includes(normalized);
        });
    }, [products, query]);

    return (
        <div className="space-y-6">
            <div className="relative max-w-md w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar productos..."
                    className="pl-11 bg-white border border-slate-200 focus-visible:ring-1 focus-visible:ring-[#26c6da] h-11 rounded-xl w-full text-sm"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {filteredProducts.map((product) => {
                    const categories =
                        product.categories && product.categories.length > 0
                            ? product.categories
                            : product.category?.slug
                                ? [product.category.slug]
                                : product.category?.name
                                    ? [slugifyCategoryName(product.category.name)]
                                    : [];
                    const categoryLabel =
                        categories.length > 0
                            ? categories.map((category) => getCategoryLabel(category)).join(', ')
                            : 'Cosmético';

                    return (
                        <ProductDetailModal key={product._id} product={product}>
                            <Card className="group relative bg-white border border-slate-200 shadow-sm overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                                {/* Image Container */}
                                <div className="relative h-48 w-full bg-slate-50 overflow-hidden">
                                    {product.images?.[0] ? (
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
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
                                            {categoryLabel}
                                        </span>
                                        <h3 className="text-base font-black text-slate-900 leading-tight line-clamp-1 group-hover:text-[#26c6da] transition-colors">
                                            {product.name}
                                        </h3>
                                    </div>

                                    <div className="flex justify-end items-center pt-1 border-t border-slate-200">
                                        <p className="text-lg font-black text-[#26c6da]">{formatCurrency(product.price)}</p>
                                    </div>
                                </div>
                            </Card>
                        </ProductDetailModal>
                    );
                })}

                {filteredProducts.length === 0 && (
                    <div className="col-span-full py-16 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                            <Package className="w-8 h-8 text-slate-400" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">No hay resultados</h2>
                        <p className="text-sm text-slate-500 mt-1">Prueba con otro término de búsqueda.</p>
                    </div>
                )}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-200 font-bold text-[10px] text-slate-400 tracking-wider gap-4">
                <p>Mostrando {filteredProducts.length} productos</p>
                <div className="flex gap-2">
                    <button disabled className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-primary">1</button>
                </div>
            </div>
        </div>
    );
}
