import { Link, Outlet, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Cat } from '../types/types';
import ArrowLeftIcon from './svg-icons/ArrowLeftIcon';

const API_KEY = "live_YbmDKA3v8KKtPciI8urhCF1UW7PCLkO0rVfYIEdBhAMUxWMuuLfBAGAeSOQqlqbU";

export default function Layout() {
    const location = useLocation();
    const isFavoritesPage = location.pathname === '/favorites';

    const [cats, setCats] = useState<Cat[]>([]);
    const [favorites, setFavorites] = useState<Cat[]>(() => {
        try {
            const saved = localStorage.getItem('favoriteCats');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [loading, setLoading] = useState(false);

    const loadingRef = useRef(false);

    useEffect(() => {
        localStorage.setItem('favoriteCats', JSON.stringify(favorites));
    }, [favorites]);

    const loadMoreCats = useCallback(async () => {
        if (loadingRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        try {
            const res = await fetch(
                'https://api.thecatapi.com/v1/images/search?limit=10&mime_types=jpg,png',
                {
                    headers: {
                        'x-api-key': API_KEY,
                    },
                }
            );

            const data: Cat[] = await res.json();

            setCats((prev) => {
                const prevIds = new Set(prev.map((cat) => cat.id));
                const uniqueCats = data.filter((cat) => !prevIds.has(cat.id));
                return [...prev, ...uniqueCats];
            });
        } catch (error) {
            console.error('Ошибка при загрузке котиков:', error);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (cats.length === 0) {
            void loadMoreCats();
        }
    }, [cats.length, loadMoreCats]);

    const toggleFavorite = useCallback((cat: Cat) => {
        setFavorites((prev) => {
            const isAlreadyFavorite = prev.some((item) => item.id === cat.id);

            if (isAlreadyFavorite) {
                return prev.filter((item) => item.id !== cat.id);
            }

            return [...prev, cat];
        });
    }, []);

    return (
        <div className="layout">
            <header className="layout__header">
                <nav className="layout__nav" aria-label="Основная навигация">
                    <div className="layout__links">
                        <Link
                            to="/"
                            className={`layout__link${location.pathname === '/' ? ' layout__link--active' : ''}`}
                        >
                            Все котики
                        </Link>

                        <Link
                            to="/favorites"
                            className={`layout__link${isFavoritesPage ? ' layout__link--active' : ''}`}
                        >
                            Любимые котики
                        </Link>
                    </div>

                    {isFavoritesPage && (
                        <Link to="/" className="layout__back-link">
                            <ArrowLeftIcon />
                            <span>Назад</span>
                        </Link>
                    )}
                </nav>
            </header>

            <main className="layout__main">
                <Outlet
                    context={{
                        cats,
                        favorites,
                        loading,
                        loadMoreCats,
                        toggleFavorite,
                    }}
                />
            </main>
        </div>
    );
}