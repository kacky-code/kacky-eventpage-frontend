// eslint-disable-next-line no-unused-vars
import mapImageFallback from '../assets/images/mapImageFallback.jpg';

const port = 8433;
const url = `https://kackydev.dingens.me:${port}`;

// eslint-disable-next-line import/prefer-default-export
export async function getDashboardData() {
  const response = await fetch(`${url}/data.json`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export function getMapImageUrl(mapNumber) {
  const imageUrl = `https://kackydev.dingens.me/static/media/images/${mapNumber}.jpg`;
  /* const res = fetch(
    `https://kackydev.dingens.me/static/media/images/${mapNumber}.jpg`,
    {
      method: 'HEAD',
    }
  );
  if (res.ok) {
    console.log('Image exists.');
    imageUrl = `https://kackydev.dingens.me/static/media/images/${mapNumber}.jpg`;
  } */
  return imageUrl;
}
