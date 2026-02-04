'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Sparkles, Tag, AlignLeft, DollarSign, Box } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import DeleteProductButton from './DeleteProductButton'
import EditProductModal from './EditProductModal'
import { formatCurrency } from '@/lib/utils'
import { Product } from '@/types/product'
import { getCategoryLabel, slugifyCategoryName } from '@/lib/categories'

interface ProductDetailModalProps {
    product: Product
    children: React.ReactNode
}

export default function ProductDetailModal({ product, children }: ProductDetailModalProps) {
    const [open, setOpen] = useState(false)
    const categories =
        product.categories && product.categories.length > 0
            ? product.categories
            : product.category?.slug
                ? [product.category.slug]
                : product.category?.name
                    ? [slugifyCategoryName(product.category.name)]
                    : []

    const categoryLabels = categories
        .map((category) => getCategoryLabel(category))
        .sort((a, b) => a.localeCompare(b));
    const maxCategories = 3;
    const visibleCategories = categoryLabels.slice(0, maxCategories);
    const hiddenCount = Math.max(categoryLabels.length - maxCategories, 0);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:w-full max-w-3xl max-h-[90vh] overflow-y-auto sm:overflow-hidden p-0 border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl">
                <div className="flex flex-col md:flex-row min-h-[500px]">
                    {/* Left: Premium Image Showcase */}
                    <div className="relative w-full md:w-1/2 h-80 md:h-auto bg-slate-50">
                        {product.images?.[0] ? (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-300">
                                <Box className="w-24 h-24 mb-4" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Sin Imagen</span>
                            </div>
                        )}

                        {/* Top Right Close hint (Optional, Dialog already has close) */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Right: Refined Info Section */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-between relative">
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    {categoryLabels.length > 0 ? (
                                        <>
                                            {visibleCategories.map((label) => (
                                                <span key={label} className="px-3 py-1 bg-[#26c6da]/10 text-[#26c6da] text-[10px] font-extrabold uppercase tracking-widest rounded-lg flex items-center gap-2">
                                                    <Tag className="w-3 h-3" />
                                                    {label}
                                                </span>
                                            ))}
                                            {hiddenCount > 0 && (
                                                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-extrabold uppercase tracking-widest rounded-lg">
                                                    +{hiddenCount} más
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <span className="px-3 py-1 bg-[#26c6da]/10 text-[#26c6da] text-[10px] font-extrabold uppercase tracking-widest rounded-lg flex items-center gap-2">
                                            <Tag className="w-3 h-3" />
                                            Cosmético
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                    {product.name}
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <AlignLeft className="w-3.5 h-3.5" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Detalles del Producto</p>
                                    </div>
                                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                        <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                                            &quot;{product.description}&quot;
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[#26c6da]">
                                        <DollarSign className="w-3.5 h-3.5" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Precio sugerido</p>
                                    </div>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-baseline gap-1">
                                        <p className="text-4xl font-black text-[#26c6da] tracking-tighter">
                                            {formatCurrency(product.price)}
                                        </p>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">MXN</span>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* Actions Footer */}
                        <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-slate-200">
                            <div className="w-full drop-shadow-xl">
                                <EditProductModal product={product} />
                            </div>
                            <div className="w-full">
                                <DeleteProductButton id={product._id} />
                            </div>
                        </div>

                        {/* Decorative Background Icon */}
                        <div className="absolute bottom-6 right-8 opacity-[0.04] pointer-events-none">
                            <Sparkles className="w-32 h-32 text-slate-200" />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
