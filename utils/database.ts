import * as SQLite from 'expo-sqlite';

import { DBPlaceType, PlaceType } from '../types';
import { Place } from '../models/place';

// Открытие или создание базы данных
const database = SQLite.openDatabaseSync('places.db');

export const init = () => {
  return database.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )
    `);
};

export const insertPlace = (place: PlaceType) => {
  return database.runAsync(
    `
            INSERT INTO places (title, imageUri, address, lat, lng)
            VALUES (?, ?, ?, ?, ?)
        `,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng
    ]
  );
};

export const fetchPlaces = async () => {
  const result = await database.getAllAsync<DBPlaceType>('SELECT * FROM places');

  const places = [];

  for (const dp of result) {
    const place = new Place(
      dp.title,
      dp.imageUri,
      dp.address,
      {
        lat: dp.lat,
        lng: dp.lng
      },
    );
    places.push(place);
  }

  return places;
};