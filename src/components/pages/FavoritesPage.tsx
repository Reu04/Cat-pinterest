import { useOutletContext } from 'react-router-dom';
import CatsGrid from '../CatsGrid';
import type { LayoutContextType } from '../../types/types';

export default function FavoritesPage() {
    const { favorites, toggleFavorite } = useOutletContext<LayoutContextType>();

    return (
        <section className="favorites">
            <div className="favorites__container">
                {favorites.length === 0 ? (
                    <p className="favorites__empty">Пока нет любимых котиков</p>
                ) : (
                    <CatsGrid
                        cats={favorites}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                    />
                )}
            </div>
        </section>
    );
}