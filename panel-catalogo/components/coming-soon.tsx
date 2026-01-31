'use client'

import { Construction } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function ComingSoon({ title }: { title: string }) {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="max-w-md w-full border-dashed border-2 bg-transparent">
                <CardContent className="flex flex-col items-center justify-center p-12 space-y-4 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <Construction className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-muted-foreground">
                        Este módulo aún no está culminado. Estamos trabajando para brindarte la mejor experiencia.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
