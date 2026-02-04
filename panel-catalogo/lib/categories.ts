export const CATEGORIES = [
    { label: 'Skincare', slug: 'skincare' },
    { label: 'Maquillaje', slug: 'maquillaje' },
    { label: 'Rostro', slug: 'rostro' },
    { label: 'Ojos', slug: 'ojos' },
    { label: 'Labios', slug: 'labios' },
    { label: 'Cabello', slug: 'cabello' },
    { label: 'Fragancias', slug: 'fragancias' },
    { label: 'Cuidado Corporal', slug: 'cuidado-corporal' }
];

export function getCategoryLabel(slug: string) {
    return CATEGORIES.find((category) => category.slug === slug)?.label ?? slug;
}

export function slugifyCategoryName(name: string) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
