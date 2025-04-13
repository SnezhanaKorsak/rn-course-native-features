import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { PlaceType } from '../types';
import { fetchPlaces } from '../utils/database';

import { PlacesList } from '../components/places/PlacesList';

export const AllPlaces = () => {
  const isFocused = useIsFocused();

  const [loadedPlaces, setLoadedPlaces] = useState<PlaceType[]>([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();

      setLoadedPlaces(places);
    };

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};