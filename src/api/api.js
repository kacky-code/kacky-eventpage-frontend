const url = `https://api.kacky.info`;

export async function login(username, password) {
  const response = await fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: username,
      pwd: password,
    }),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function logoutServer(token) {
  const response = await fetch(`${url}/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function registerUser(username, password, mailadress) {
  const response = await fetch(`${url}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: username,
      pwd: password,
      mail: mailadress,
    }),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function getDashboardData(token) {
  const config =
    token === ''
      ? {
          Accept: 'application/json, text/plain, */*',
        }
      : {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json, text/plain, */*',
        };

  const response = await fetch(`${url}/dashboard`, {
    headers: config,
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function getSpreadsheetData(token) {
  const config =
    token === ''
      ? {
          Accept: 'application/json, text/plain, */*',
        }
      : {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json, text/plain, */*',
        };

  const response = await fetch(`${url}/spreadsheet`, {
    headers: config,
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function postSpreadsheetData(data) {
  const response = await fetch(`${url}/spreadsheet`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function getProfileData(token) {
  const response = await fetch(`${url}/usermgnt`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function postProfileData(data) {
  const response = await fetch(`${url}/usermgnt`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${data.token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export function getMapImageUrl(mapNumber) {
  const imageUrl = `https://kackydev.dingens.me/static/media/images/${mapNumber}.jpg`;
  return imageUrl;
}
