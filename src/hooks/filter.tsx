import React, { createContext, useCallback, useContext, useState } from 'react';
import Ad from '../types/Ad';
import { Tag } from '../types/Tag';

interface Position {
  latitude: number;
  longitude: number;
}

interface FilterContextData {
  order: 'date' | 'distance' | 'rating';
  position: Position | undefined;
  maxDistance: number;
  tags: Tag[];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  minRating: number;
  setOrder(order: 'date' | 'distance' | 'rating'): void;
  setPosition(position: Position): void;
  setMaxDistance(maxDistance: number): void;
  setTags(tags: Tag[]): void;
  setMinPrice(minPrice: number | undefined): void;
  setMaxPrice(maxPrice: number | undefined): void;
  setMinRating(minRating: number): void;
  orderFn(ad1: Ad, ad2: Ad): number;
  filterFn(ad: Ad): boolean;
}

const FilterContext = createContext({} as FilterContextData);

const FilterProvider: React.FC = ({ children }) => {
  const [order, setOrder] = useState<'date' | 'distance' | 'rating'>('date');
  const [position, setPosition] = useState<Position>();
  const [maxDistance, setMaxDistance] = useState<number>(100);
  const [minRating, setMinRating] = useState<number>(0);
  const [tags, setTags] = useState<Tag[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const orderFn = useCallback(
    (ad1: Ad, ad2: Ad) => {
      if (order === 'distance')
        return (ad1.distance || 0) - (ad2.distance || 0);
      if (order === 'date') return ad2.date.getTime() - ad1.date.getTime();
      return ad2.rating - ad1.rating;
    },
    [order],
  );

  const filterFn = useCallback(
    (ad: Ad) => {
      if (ad.rating < minRating) return false;

      if (minPrice && ad.price < minPrice) return false;

      if (maxPrice && ad.price > maxPrice) return false;

      if (maxDistance < 100 && ad.distance && ad.distance > maxDistance)
        return false;

      if (tags.length > 0) {
        const tagsNotFound = tags.filter(
          tag => !ad.tags.find(t => t === tag.title),
        );
        if (tagsNotFound.length > 0) return false;
      }

      return true;
    },
    [maxDistance, maxPrice, minPrice, tags],
  );

  return (
    <FilterContext.Provider
      value={{
        order,
        position,
        maxDistance,
        tags,
        minPrice,
        maxPrice,
        minRating,
        setOrder,
        setPosition,
        setMaxDistance,
        setTags,
        setMinPrice,
        setMaxPrice,
        setMinRating,
        orderFn,
        filterFn,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

function useFilter(): FilterContextData {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useFilter must be used within an FilterProvider');
  }

  return context;
}

export { FilterProvider, useFilter };
