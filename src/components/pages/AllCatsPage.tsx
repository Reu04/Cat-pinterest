import { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import CatsGrid from '../CatsGrid';
import type { LayoutContextType } from '../../types/types';

export default function AllCatsPage() {
    const {
        cats,
        favorites,
        loading,
        loadMoreCats,
        toggleFavorite,
    } = useOutletContext<LayoutContextType>();

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const currentRef = observerRef.current;

        if (!currentRef) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];

                if (firstEntry.isIntersecting && !loading) {
                    void loadMoreCats();
                }
            },
            {
                rootMargin: '300px',
            }
        );

        observer.observe(currentRef);

        return () => {
            observer.disconnect();
        };
    }, [loadMoreCats, loading]);

    useEffect(() => {
        if (
            !loading &&
            document.documentElement.scrollHeight <= window.innerHeight
        ) {
            void loadMoreCats();
        }
    }, [cats, loading, loadMoreCats]);

    return (
        <section className="all-cats">
            <div className="all-cats__container">
                <CatsGrid
                    cats={cats}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                />

                <div ref={observerRef} className="all-cats__observer" />

                {loading && (
                    <div className="all-cats__loader">
                        <TailSpin
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}