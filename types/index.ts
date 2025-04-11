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