const url = `https://api.kacky.info`;
const recordsUrl = `https://records.kacky.info`;

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

export async function eventLiveState() {
  const response = await fetch(`${url}/eventstatus`);
  return response.json();
}

export async function getAllEvents() {
  return fetch(`${recordsUrl}/events`)
    .then(response => response.json())
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

export async function getSpreadsheetData(token, type, edition) {
  const config =
    token === ''
      ? {
          Accept: 'application/json, text/plain, */*',
        }
      : {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json, text/plain, */*',
        };

  const response = await fetch(`${url}/spreadsheet/${type}/${edition}`, {
    headers: config,
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function getScheduleData(token) {
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

export async function postSpreadsheetData(data, type) {
  const response = await fetch(`${url}/spreadsheet/${type}`, {
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

export async function getFinishes(token) {
  const response = await fetch(`${url}/fin`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export function getMapImageUrl(eventType, mapNumber) {
  // remove "[v2]" and similar
  const cleanedMapNumber = mapNumber.toString().split(" ")[0];
  const imageUrl = `https://static.kacky.info/${eventType}/thumbs/${cleanedMapNumber}.jpg`;
  return imageUrl;
}

export async function getPersonalBests(token, type) {
  const response = await fetch(`${url}/pb/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function getPerformance(token, type) {
  const response = await fetch(`${url}/performance/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function getLeaderBoardPage(token, startrank, elements) {
  const response = await fetch(`https://records.kacky.info/event/leaderboard/kk/8?start=${startrank}&elems=${elements}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function getLeaderBoardPlayer(token, searchlogin) {
  const response = await fetch(`https://records.kacky.info/event/leaderboard/kk/8/${searchlogin}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function getStreamInfo(token) {
  const response = await fetch(`${url}/stream`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function getWRHolderLeaderboard(token, eventtype) {
  const response = await fetch(`${url}/wrleaderboard/${eventtype}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function resetPasswordStep1(username, mailaddr) {
  const response = await fetch(`${url}/pwdreset`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: username,
      mail: mailaddr,
    }),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function resetPasswordStep2(token, pwd) {
  const response = await fetch(`${url}/pwdreset`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
      pwd,
    }),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}
