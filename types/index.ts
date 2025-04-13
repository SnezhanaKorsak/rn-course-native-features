export type PlaceType = {
  id: string;
  title: string;
  imageUri: string,
  address: string,
  location: Location,
}

export type Location = {
  lat: number;
  lng: number;
}

export type PickedLocation = Location & {address: string};

export type DBPlaceType = Omit<PlaceType, 'location'> & Location;