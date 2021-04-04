import React, { createContext, useCallback, useContext, useState } from 'react';
import Ad from '../types/Ad';
import { Tag } from '../types/Tag';
import { useGeolocation } from './geolocation';

interface Position {
  latitude: number;
  longitude: number;
}

interface FilterContextData {
  order: 'date' | 'distance';
  position: Position | undefined;
  maxDistance: number;
  tags: Tag[];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  setOrder(order: 'date' | 'distance'): void;
  setPosition(position: Position): void;
  setMaxDistance(maxDistance: number): void;
  setTags(tags: Tag[]): void;
  setMinPrice(minPrice: number | undefined): void;
  setMaxPrice(maxPrice: number | undefined): void;
  orderFn(ad1: Ad, ad2: Ad): number;
  filterFn(ad: Ad): boolean;
}

const FilterContext = createContext({} as FilterContextData);

const FilterProvider: React.FC = ({ children }) => {
  const [order, setOrder] = useState<'date' | 'distance'>('date');
  const [position, setPosition] = useState<Position>();
  const [maxDistance, setMaxDistance] = useState<number>(100);
  const [tags, setTags] = useState<Tag[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const { getDistance } = useGeolocation();

  const orderFn = useCallback(
    (ad1: Ad, ad2: Ad) => {
      if (order === 'distance' && position) {
        return getDistance(ad1, position) - getDistance(ad2, position);
      }
      return ad2.date.getTime() - ad1.date.getTime();
    },
    [getDistance, order, position],
  );

  const filterFn = useCallback(
    (ad: Ad) => {
      if (minPrice && ad.price < minPrice) return false;

      if (maxPrice && ad.price > maxPrice) return false;

      if (tags.length > 0) {
        const tagsNotFound = tags.filter(
          tag => !ad.tags.find(t => t === tag.title),
        );
        if (tagsNotFound.length > 0) return false;
      }

      if (maxDistance < 100 && position) {
        const distance = getDistance(position, ad);
        if (distance > maxDistance) return false;
      }

      return true;
    },
    [getDistance, maxDistance, maxPrice, minPrice, position, tags],
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
        setOrder,
        setPosition,
        setMaxDistance,
        setTags,
        setMinPrice,
        setMaxPrice,
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
