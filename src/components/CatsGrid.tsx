import type { CatsGridProps } from '../types/types';
import { useMemo } from 'react';
import CatCard from './CatCard';

export default function CatsGrid({
    cats,
    favorites,
    onToggleFavorite,
}: CatsGridProps) {
    const favoriteIds = useMemo(() => {
        return new Set(favorites.map((item) => item.id));
    }, [favorites]);

    return (
    <div className="cats-grid">
        {cats.map((cat) => (
        <CatCard
            key={cat.id}
            cat={cat}
            isFavorite={favoriteIds.has(cat.id)}
            onToggleFavorite={onToggleFavorite}
        />
        ))}
    </div>
    );
}