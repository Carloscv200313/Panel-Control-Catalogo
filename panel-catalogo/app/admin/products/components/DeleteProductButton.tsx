'use client';

import { useTransition, useState } from 'react';
import { Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteProduct } from '@/app/actions/products';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog';

export default function DeleteProductButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    async function handleDelete() {
        startTransition(async () => {
            try {
                await deleteProduct(id);
                setOpen(false);
            } catch (error) {
                console.error(error);
                alert('Error al eliminar el producto');
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full h-12 px-5 rounded-2xl border border-red-200 bg-white text-red-500 hover:bg-red-50 hover:text-red-600 shadow-sm transition-all gap-2 text-xs font-black uppercase tracking-widest"
                >
                    <Trash2 className="w-4 h-4" />
                    Eliminar Producto
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[95vw] sm:w-full max-w-md max-h-[90vh] overflow-y-auto sm:overflow-hidden p-0 border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl">
                <Card className="border-none shadow-none bg-transparent">
                    <CardHeader className="pt-8 flex flex-col items-center">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <CardTitle className="text-xl font-black text-center text-slate-900 leading-tight">
                            ¿Estás seguro de que deseas eliminar este producto?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <p className="text-slate-500 text-center text-sm font-medium">
                            Esta acción no se puede deshacer. Se eliminará permanentemente de tu inventario.
                        </p>
                    </CardContent>
                    <CardFooter className="flex gap-3 px-8 pb-8">
                        <Button
                            variant="ghost"
                            onClick={() => setOpen(false)}
                            className="flex-1 h-12 rounded-xl font-bold text-slate-500 hover:bg-slate-100"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isPending}
                            className="flex-1 h-12 rounded-xl font-bold bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20"
                        >
                            {isPending ? 'Eliminando...' : 'Eliminar'}
                        </Button>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    );
}
