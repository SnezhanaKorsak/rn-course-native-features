const MAP_URL = process.env.EXPO_PUBLIC_MAP_URL;
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export function getMapPreview(lat: number, lng: number) {
  return `${MAP_URL}/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
}