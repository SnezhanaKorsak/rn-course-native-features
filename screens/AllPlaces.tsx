import { useEffect, useState } from 'react';
import { useIsFocused, useRoute } from '@react-navigation/native';

import { PlacesList } from '../components/places/PlacesList';
import { AllPlaceRouteProp } from '../navigation/types';
import { PlaceType } from '../types';


export const AllPlaces = () => {
  const { params } = useRoute<AllPlaceRouteProp>();
  const isFocused = useIsFocused();

  const [loadedPlaces, setLoadedPlaces] = useState<PlaceType[]>([]);

  useEffect(() => {
    if (isFocused && params) {
      setLoadedPlaces((prev) => [...prev, params.place]);
    }
  }, [isFocused, params]);

  return <PlacesList places={loadedPlaces} />;
};