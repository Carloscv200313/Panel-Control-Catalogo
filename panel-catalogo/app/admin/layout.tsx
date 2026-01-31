'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Package,
    LogOut,
    LayoutDashboard,
    ClipboardList,
    Users,
    BarChart3,
    Search,
    Menu,
    X
} from 'lucide-react';
import { logout } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Package, label: 'Productos', href: '/admin/products' },
    { icon: ClipboardList, label: 'Pedidos', href: '/admin/orders' },
    { icon: Users, label: 'Clientes', href: '/admin/customers' },
    { icon: BarChart3, label: 'Reportes', href: '/admin/reports' },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Close sidebar on mobile when navigating
    const [prevPathname, setPrevPathname] = useState(pathname);
    if (pathname !== prevPathname) {
        setPrevPathname(pathname);
        setSidebarOpen(false);
    }

    return (
        <div className="flex min-h-screen bg-[#fafafa] dark:bg-[#020617] overflow-x-hidden">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[#111827] dark:bg-[#0f172a] text-white flex flex-col transition-transform duration-300 lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-5 flex items-center justify-between">
                    <Link href="/admin/products" className="flex items-center gap-3 active:scale-95 transition-transform">
                        <div className="w-9 h-9 bg-[#26c6da] rounded-xl flex items-center justify-center shadow-lg shadow-[#26c6da]/20">
                            <span className="font-black text-white text-lg">L</span>
                        </div>
                        <h1 className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">Lumina</h1>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-gray-400 hover:text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </Button>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-[#26c6da]/15 text-[#26c6da] shadow-sm shadow-[#26c6da]/5'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className={`w-4.5 h-4.5 transition-colors ${isActive ? 'text-[#26c6da]' : 'group-hover:text-white'}`} />
                                <span className={`font-semibold text-sm tracking-wide ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'} transition-transform`}>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <form action={logout}>
                        <Button variant="ghost" className="w-full justify-start gap-4 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl h-11 transition-all group">
                            <LogOut className="w-4.5 h-4.5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold text-sm">Cerrar Sesión</span>
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-64'}`}>
                {/* Header */}
                <header className="h-16 bg-white/70 dark:bg-[#020617]/70 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden rounded-xl h-10 w-10 hover:bg-gray-100 dark:hover:bg-white/5"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </Button>

                        <div className="max-w-md w-full relative group hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#26c6da] transition-colors" />
                            <Input
                                placeholder="Buscar..."
                                className="pl-11 bg-gray-100/50 dark:bg-white/5 border-transparent focus-visible:ring-1 focus-visible:ring-[#26c6da] h-10 rounded-xl w-full text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5">
                        <ThemeToggle />

                        <div className="h-8 w-px bg-gray-200 dark:bg-white/10 hidden sm:block" />

                        <div className="flex items-center gap-3 group cursor-pointer pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black dark:text-white tracking-tight leading-none group-hover:text-[#26c6da] transition-colors">Admin Lumina</p>
                                <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase mt-1">Super Admin</p>
                            </div>
                            <div className="relative">
                                <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#26c6da] to-[#00acc1] p-[2px] shadow-lg shadow-[#26c6da]/20 group-hover:scale-105 transition-transform">
                                    <div className="w-full h-full rounded-full bg-white dark:bg-[#0f172a] flex items-center justify-center overflow-hidden">
                                        <Image
                                            src="https://w7.pngwing.com/pngs/210/236/png-transparent-avatar-face-girl-female-woman-profile-happy-avatar-icon.png"
                                            alt="Admin"
                                            className="w-full h-full object-cover"
                                            width={36}
                                            height={36}
                                        />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-[#020617] rounded-full" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-4 sm:p-6 bg-[#fafafa] dark:bg-[#020617]">
                    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
