const MAP_URL = process.env.EXPO_PUBLIC_MAP_URL;
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const OPEN_STREET_MAP = process.env.EXPO_PUBLIC_OPENSTREET_MAP;

export function getMapPreview(lat: number, lng: number) {
  return `${MAP_URL}/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
}

export async function getAddress(lat: number, lng: number) {
  const url = `${MAP_URL}/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch address!');
  }

  const data = await response.json();
  return data.results[0].formatted_address;
}

export const getAddressFromCoords = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `${OPEN_STREET_MAP}/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'ReactNativeApp/1.0 (your@email.com)',
          'Accept-Language': 'ru' // по желанию
        }
      }
    );
    const data = await response.json();
    const address = data.address;

    // Стрит (улица)
    const street = address.road || address.pedestrian || address.footway || address.street || '';
    const houseNumber = address.house_number || '';

    // Город (разные типы населённых пунктов)
    const city =
      address.city ||
      address.town ||
      address.village ||
      address.hamlet ||
      address.county ||
      '';

    const result = `${street} ${houseNumber}, ${city}`;

    return result.trim();
  } catch (error) {
    const errorMessage = `Ошибка при получении адреса: ${error}`;
    console.error(errorMessage);

    return errorMessage;
  }
};