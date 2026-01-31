'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Sparkles, Tag, AlignLeft, DollarSign, Box } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import DeleteProductButton from './DeleteProductButton'
import EditProductModal from './EditProductModal'
import { formatCurrency } from '@/lib/utils'
import { Product } from '@/types/product'

interface ProductDetailModalProps {
    product: Product
    children: React.ReactNode
}

export default function ProductDetailModal({ product, children }: ProductDetailModalProps) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 overflow-hidden border-none rounded-[2.5rem] bg-white dark:bg-[#0f172a] shadow-2xl shadow-black/30">
                <div className="flex flex-col md:flex-row min-h-[500px]">
                    {/* Left: Premium Image Showcase */}
                    <div className="relative w-full md:w-1/2 h-80 md:h-auto bg-gray-50 dark:bg-[#1e293b]">
                        {product.images?.[0] ? (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-200 dark:text-white/5">
                                <Box className="w-24 h-24 mb-4" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Sin Imagen</span>
                            </div>
                        )}

                        {/* Status Badge */}
                        <div className="absolute top-6 left-6">
                            <div className={`px-4 py-1.5 ${product.isActive !== false ? 'bg-green-500/90' : 'bg-red-500/90'} backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl flex items-center gap-2`}>
                                <div className={`w-2 h-2 rounded-full ${product.isActive !== false ? 'bg-white animate-pulse' : 'bg-white/50'}`} />
                                {product.isActive !== false ? 'Producto Activo' : 'Producto Inactivo'}
                            </div>
                        </div>

                        {/* Top Right Close hint (Optional, Dialog already has close) */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Right: Refined Info Section */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-between relative">
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-[#26c6da]/10 text-[#26c6da] text-[10px] font-extrabold uppercase tracking-widest rounded-lg flex items-center gap-2">
                                        <Tag className="w-3 h-3" />
                                        {product.category?.name}
                                    </span>
                                </div>
                                <h2 className="text-3xl font-black dark:text-white leading-[1.1] tracking-tight">
                                    {product.name}
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                                        <AlignLeft className="w-3.5 h-3.5" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Detalles del Producto</p>
                                    </div>
                                    <div className="bg-gray-50/50 dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                                        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed italic">
                                            &quot;{product.description}&quot;
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[#26c6da]">
                                        <DollarSign className="w-3.5 h-3.5" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Precio Sugerido</p>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <p className="text-4xl font-black text-[#26c6da] tracking-tighter">
                                            {formatCurrency(product.price)}
                                        </p>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">MXN</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions Footer */}
                        <div className="flex items-center gap-4 pt-10 mt-10 border-t border-gray-100 dark:border-white/5">
                            <div className="flex-1 drop-shadow-xl">
                                <EditProductModal product={product} />
                            </div>
                            <DeleteProductButton id={product._id} />
                        </div>

                        {/* Decorative Background Icon */}
                        <div className="absolute bottom-6 right-8 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                            <Sparkles className="w-32 h-32 text-black dark:text-white" />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
