'use client';

import { useActionState, useState } from 'react';
import { login } from '../actions/auth';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';
import { useFormStatus } from 'react-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            className="w-full bg-[#26c6da] hover:bg-[#00acc1] text-white font-bold h-11 rounded-md shadow-md shadow-[#26c6da]/25 transition-all active:scale-[0.99] gap-2 text-sm group"
            disabled={pending}
        >
            {pending ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Entrando...
                </div>
            ) : (
                <>
                    Ingresar al sistema
                    <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
            )}
        </Button>
    );
}

export default function LoginPage() {
    const [state, formAction] = useActionState(login, null);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen w-full bg-white">
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
                {/* Left Visual Panel */}
                <div className="relative hidden lg:flex items-end overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "linear-gradient(180deg, rgba(12,12,14,0.05) 0%, rgba(12,12,14,0.75) 85%), url(/login.jpg)",
                        }}
                    />
                    <div className="relative z-10 p-10 text-white">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
                            Lumina Retail Suite
                        </div>
                        <h2 className="mt-6 text-4xl font-black leading-tight">
                            La excelencia en gestión de belleza
                        </h2>
                        <p className="mt-3 text-sm text-white/80 max-w-md">
                            Controle su inventario, ventas y clientes con la plataforma líder en el sector retail de cosméticos.
                        </p>
                    </div>
                </div>

                {/* Right Form Panel */}
                <div className="flex items-center justify-center px-6 py-12 lg:px-12 bg-white">
                    <div className="w-full max-w-[560px] animate-in fade-in zoom-in-95 duration-700">
                        <div className="mb-9">
                            <div className="inline-flex items-center gap-3">
                                <div className="h-8 w-8 rounded-md bg-[#26c6da] flex items-center justify-center shadow-sm">
                                    <span className="font-black text-white text-base">L</span>
                                </div>
                                <span className="text-base font-black tracking-tight text-slate-900">LUMINA</span>
                            </div>
                            <h1 className="mt-4 text-3xl font-black text-slate-900">Acceso Profesional</h1>
                            <p className="mt-1 text-[15px] text-[#26c6da]">
                                Inicie sesión para gestionar su tienda retail.
                            </p>
                        </div>

                        <Card className="border border-slate-200 shadow-lg bg-white rounded-2xl overflow-hidden">
                            <form action={formAction}>
                                <CardContent className="px-12 space-y-7 pt-9 pb-9">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="userName" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Correo electrónico</Label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#26c6da] transition-colors" />
                                            <Input
                                                id="userName"
                                                name="userName"
                                                type="text"
                                                placeholder="admin@lumina.com"
                                                required
                                                className="pl-11 h-13 bg-white border border-slate-200 rounded-md focus-visible:ring-1 focus-visible:ring-[#26c6da] transition-all font-medium text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Contraseña</Label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#26c6da] transition-colors" />
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                required
                                                className="pl-11 pr-11 h-13 bg-white border border-slate-200 rounded-md focus-visible:ring-1 focus-visible:ring-[#26c6da] transition-all font-medium text-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#26c6da] transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-[12px] pt-3">
                                        <label className="flex items-center gap-2 text-slate-500">
                                            <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300 text-[#26c6da] focus:ring-[#26c6da]" />
                                            Recordarme
                                        </label>
                                        <button type="button" className="font-semibold text-[#26c6da] hover:underline">
                                            ¿Olvidó su contraseña?
                                        </button>
                                    </div>

                                    {state?.message && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[11px] font-bold text-center animate-in fade-in slide-in-from-top-1">
                                            {state.message}
                                        </div>
                                    )}
                                    <SubmitButton />
                                </CardContent>
                            </form>
                        </Card>

                        <div className="mt-5 text-[10px] text-slate-400">
                            <div className="flex items-center justify-between">
                                <span>Lumina Retail v2.4.0</span>
                                <div className="flex items-center gap-3">
                                    <button type="button" className="hover:underline">Soporte</button>
                                    <button type="button" className="hover:underline">Privacidad</button>
                                </div>
                            </div>
                            <button type="button" className="mt-3 font-semibold text-[#26c6da] hover:underline flex items-center gap-1 mx-auto">
                                Solicitar recuperación de acceso
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
