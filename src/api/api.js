const port = 8433;
const url = `https://kackydev.dingens.me:${port}`;

// eslint-disable-next-line import/prefer-default-export
export async function getDashboardData() {
  const response = await fetch(`${url}/data.json`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}
