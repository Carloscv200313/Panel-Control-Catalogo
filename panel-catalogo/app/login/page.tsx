'use client';

import { useActionState, useState } from 'react';
import { login } from '../actions/auth';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useFormStatus } from 'react-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Lock, User, Eye, EyeOff, LogIn, Heart } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            className="w-full bg-[#26c6da] hover:bg-[#00acc1] text-white font-black h-12 rounded-xl shadow-lg shadow-[#26c6da]/20 transition-all active:scale-[0.98] gap-2 text-sm group"
            disabled={pending}
        >
            {pending ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Entrando...
                </div>
            ) : (
                <>
                    Comenzar ahora
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
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#fafafa] dark:bg-[#020617] relative overflow-hidden">
            {/* Soft Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#26c6da]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-[#f06292]/5 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-[440px] relative z-10 animate-in fade-in zoom-in-95 duration-700">
                {/* Logo / Brand Area */}
                <div className="text-center mb-8 space-y-3">
                    <div className="mx-auto w-14 h-14 bg-linear-to-br from-[#26c6da] to-[#00acc1] rounded-2xl flex items-center justify-center shadow-xl shadow-[#26c6da]/20 transform rotate-2">
                        <span className="font-black text-white text-2xl">L</span>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-black tracking-tight dark:text-white uppercase">Lumina Admin</h1>
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase">Panel de Control</p>
                    </div>
                </div>

                <Card className="border-none shadow-2xl shadow-black/5 dark:shadow-none bg-white dark:bg-[#0f172a] rounded-3xl overflow-hidden transition-all duration-300">
                    <CardHeader className="pt-8 pb-4 px-8">
                        <div className="flex items-center gap-2 text-[#26c6da] mb-1">
                            <Heart className="w-4 h-4 fill-current" />
                            <span className="text-[10px] font-black uppercase tracking-widest">¡Hola de nuevo!</span>
                        </div>
                        <CardTitle className="text-xl font-black dark:text-white">Bienvenido al Panel</CardTitle>
                        <CardDescription className="text-xs font-medium text-gray-400">
                            Ingresa tus datos para gestionar tu catálogo.
                        </CardDescription>
                    </CardHeader>

                    <form action={formAction}>
                        <CardContent className="px-8 space-y-5 pt-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="userName" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Usuario</Label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#26c6da] transition-colors" />
                                    <Input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        placeholder="admin"
                                        required
                                        className="pl-11 h-12 bg-gray-50 dark:bg-white/5 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-[#26c6da] transition-all font-semibold text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Contraseña</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#26c6da] transition-colors" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        className="pl-11 pr-11 h-12 bg-gray-50 dark:bg-white/5 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-[#26c6da] transition-all font-semibold text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#26c6da] transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {state?.message && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[11px] font-bold text-center animate-in fade-in slide-in-from-top-1">
                                    {state.message}
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="px-8 pt-6 pb-10">
                            <SubmitButton />
                        </CardFooter>
                    </form>
                </Card>

                <div className="mt-8 text-center">
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.3em] opacity-60">Lumina Beauty & Care © 2026</p>
                </div>
            </div>
        </div>
    );
}
