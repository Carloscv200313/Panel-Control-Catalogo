'use client';

import { useState, useEffect, useActionState, useRef } from 'react';
import { createProduct } from '@/app/actions/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import {
    Info,
    DollarSign,
    Upload,
    Rocket,
    Plus,
    X,
    Sparkles,
    Image as ImageIcon,
    Tag,
    AlignLeft
} from 'lucide-react';

const CATEGORIES = [
    'Skincare',
    'Maquillaje',
    'Rostro',
    'Ojos',
    'Labios',
    'Cabello',
    'Fragancias',
    'Cuidado Corporal'
];

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={pending}
            className="relative overflow-hidden bg-linear-to-r from-[#26c6da] to-[#00acc1] hover:from-[#00acc1] hover:to-[#0097a7] text-white font-black h-12 px-8 rounded-2xl shadow-xl shadow-[#26c6da]/20 transition-all active:scale-95 gap-3 group text-sm"
        >
            {pending ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Publicando...</span>
                </div>
            ) : (
                <>
                    <Rocket className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Publicar Producto</span>
                </>
            )}
        </Button>
    );
}

export default function NewProductModal() {
    const [state, formAction] = useActionState(createProduct, null);
    const [preview, setPreview] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(CATEGORIES[0]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    }

    function removeImage() {
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }

    useEffect(() => {
        if (state?.success) {
            // Use a timeout to move the state update out of the synchronous effect execution
            // This avoids the "cascading renders" warning.
            const timer = setTimeout(() => {
                setOpen(false);
                setPreview(null);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [state]);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#26c6da] hover:bg-[#00acc1] text-white font-black h-12 px-6 rounded-2xl shadow-lg shadow-[#26c6da]/10 transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95 gap-2.5 text-sm group">
                    <div className="bg-white/20 p-1 rounded-lg group-hover:rotate-90 transition-transform duration-300">
                        <Plus className="w-4 h-4" />
                    </div>
                    Nuevo Producto
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:w-full max-w-4xl h-[90vh] sm:h-auto max-h-[90vh] p-0 border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl">
                <div className="flex flex-col h-full max-h-[90vh]">
                    {/* Decorative Header */}
                    <div className="relative p-8 bg-linear-to-br from-[#26c6da]/10 via-transparent to-transparent border-b border-slate-200">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Sparkles className="w-24 h-24 text-[#26c6da]" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                Crear Nuevo Producto
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-[#26c6da] text-white px-2 py-0.5 rounded-sm">Admin</span>
                            </h2>
                            <p className="text-sm text-slate-500 font-medium mt-1">Transforma tu catálogo con un nuevo artículo premium.</p>
                        </div>
                    </div>

                    <form action={formAction} className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                        <div className="p-6 sm:p-8">
                            <input type="hidden" name="categoryName" value={category} />

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                {/* Left Side: Core Info */}
                                <div className="lg:col-span-7 space-y-8">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 text-[#26c6da]">
                                            <div className="w-10 h-10 rounded-2xl bg-[#26c6da]/10 flex items-center justify-center">
                                                <Info className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm md:text-lg">Información Principal</h3>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="space-y-2 group">
                                                <Label htmlFor="name" className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 ml-1 group-focus-within:text-[#26c6da] transition-colors">
                                                    <Tag className="w-3 h-3" />
                                                    Nombre del Producto
                                                </Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="Ej. Serum Facial Iluminador"
                                                    className="h-14 rounded-2xl bg-white border border-slate-200 focus:border-[#26c6da]/30 focus:bg-white text-base font-bold transition-all px-5 shadow-inner"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2 group">
                                                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 ml-1 group-focus-within:text-[#26c6da] transition-colors">
                                                    <Sparkles className="w-3 h-3" />
                                                    Categoría del Catálogo
                                                </Label>
                                                <Select value={category} onValueChange={setCategory}>
                                                    <SelectTrigger className="h-14 rounded-2xl bg-white border border-slate-200 focus:ring-0 focus:border-[#26c6da]/30 text-base font-bold px-5 shadow-inner">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-2xl border border-slate-200 shadow-2xl">
                                                        {CATEGORIES.map((cat) => (
                                                            <SelectItem key={cat} value={cat} className="rounded-xl py-3 font-bold focus:bg-[#26c6da] focus:text-white cursor-pointer">
                                                                {cat}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2 group">
                                                <Label htmlFor="description" className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 ml-1 group-focus-within:text-[#26c6da] transition-colors">
                                                    <AlignLeft className="w-3 h-3" />
                                                    Descripción Detallada
                                                </Label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    className="flex min-h-[160px] w-full rounded-2xl bg-white border border-slate-200 px-5 py-4 text-base font-bold focus-visible:outline-none focus:border-[#26c6da]/30 focus:bg-white transition-all resize-none shadow-inner"
                                                    placeholder="Describe los beneficios, ingredientes y modo de uso..."
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Media & Price */}
                                <div className="lg:col-span-5 space-y-8">
                                    {/* Price Section */}
                                    <div className="bg-[#26c6da]/5 rounded-4xl p-6 space-y-4 border border-[#26c6da]/10">
                                        <div className="flex items-center gap-3 text-[#26c6da]">
                                            <div className="w-8 h-8 rounded-xl bg-[#26c6da]/20 flex items-center justify-center text-[#26c6da]">
                                                <DollarSign className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-sm font-black uppercase tracking-widest">Precio</h3>
                                        </div>
                                        <div className="relative group">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-black text-[#26c6da]/50">$</span>
                                            <Input
                                                id="price"
                                                name="price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                placeholder="0.00"
                                                className="h-16 pl-10 pr-5 rounded-2xl bg-white border border-slate-200 focus:border-[#26c6da]/30 text-2xl font-black text-[#26c6da] shadow-lg transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Multimedia Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-indigo-600">
                                            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                                <ImageIcon className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-sm font-black uppercase tracking-widest">Imagen Principal</h3>
                                        </div>

                                        <div className="relative group group/img">
                                            <Label htmlFor="image-modal" className={`relative flex flex-col items-center justify-center w-full ${preview ? 'h-64' : 'h-52'} rounded-[2.5rem] border-2 border-dashed ${preview ? 'border-[#26c6da]/30' : 'border-slate-200'} bg-slate-50 hover:bg-[#26c6da]/5 hover:border-[#26c6da]/50 transition-all cursor-pointer overflow-hidden`}>
                                                {preview ? (
                                                    <div className="relative w-full h-full group">
                                                        <Image src={preview} alt="Preview" fill className="object-cover" />
                                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <div className="bg-white text-[#26c6da] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                                                <Upload className="w-3.5 h-3.5" />
                                                                Cambiar Imagen
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => { e.preventDefault(); removeImage(); }}
                                                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg transform hover:scale-110 active:scale-95 transition-all z-20"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center gap-4 p-8 text-center">
                                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                                                            <Upload className="w-6 h-6 text-[#26c6da]" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-sm font-black text-slate-800">Click para subir</p>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">PNG, JPG o WebP (Max 5MB)</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <Input
                                                    ref={fileInputRef}
                                                    id="image-modal"
                                                    name="image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </Label>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            {/* Dynamic Tip */}
                            <div className="bg-amber-500/5 rounded-2xl p-3 mt-4 border flex items-center border-amber-500/10 gap-3">
                                <div className="w-6 h-6 rounded-lg bg-amber-500/10 shrink-0 flex items-center justify-center text-amber-500">
                                    <Sparkles className="w-3 h-3" />
                                </div>
                                <p className="text-[13px] text-amber-700 font-bold leading-relaxed">
                                    CONSEJO: Un nombre claro y fotos con buena iluminación aumentan un 40% la visualización de tus productos.
                                </p>
                            </div>
                            {state?.message && (
                                <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-black text-center animate-shake">
                                    {state.message}
                                </div>
                            )}
                        </div>
                        {/* Footer Actions */}
                        <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setOpen(false)}
                                className="h-12 px-8 rounded-2xl font-black text-slate-500 hover:text-slate-700 text-xs uppercase tracking-widest transition-all hover:bg-white"
                            >
                                Cancelar
                            </Button>
                            <SubmitButton />
                        </div>
                    </form>
                </div>
            </DialogContent>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0,0,0,0.05);
                    border-radius: 10px;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </Dialog>
    );
}
