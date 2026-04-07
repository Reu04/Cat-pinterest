import likeOn from '../assets/like-on.svg';
import likeOff from '../assets/like-off.svg';
import type { CatCardProps } from '../types/types';
import { memo, useCallback } from 'react';

const CatCard = memo(function CatCard({
    cat,
    isFavorite,
    onToggleFavorite,
}: CatCardProps) {
    const handleClick = useCallback(() => {
        onToggleFavorite(cat);
    }, [onToggleFavorite, cat]);

  return (
    <div className="cat-card">
      <div className="cat-card__media">
        <img
          src={cat.url}
          alt="Котик"
          className="cat-card__image"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.png';
          }}
        />

        <button
          type="button"
          className={`cat-card__favorite-button ${
            isFavorite
              ? 'cat-card__favorite-button--active'
              : 'cat-card__favorite-button--inactive'
          }`}
          onClick={handleClick}
          aria-label={
            isFavorite
              ? 'Удалить из избранного'
              : 'Добавить в избранное'
          }
        >
          <img
            src={isFavorite ? likeOn : likeOff}
            alt=""
            className="cat-card__favorite-icon"
          />
        </button>
      </div>
    </div>
  );
});

export default CatCard;