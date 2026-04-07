export type Cat = {
    id: string;
    url: string;
};

export type LayoutContextType = {
    cats: Cat[];
    favorites: Cat[];
    loading: boolean;
    loadMoreCats: () => Promise<void>;
    toggleFavorite: (cat: Cat) => void;
};

export type CatCardProps = {
    cat: Cat;
    isFavorite: boolean;
    onToggleFavorite: (cat: Cat) => void;
}

export type CatsGridProps = {
    cats: Cat[];
    favorites: Cat[];
    onToggleFavorite: (cat: Cat) => void;
};