const url = `https://api.kacky.gg`;

let cachedEvents = null;

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

export async function getAllEvents(token) {
  if (cachedEvents) return cachedEvents;

  const config = {};
  if (token === undefined) {
    config.method = 'GET';
    config.headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    };
  } else {
    config.method = 'POST';
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    };
    config.body = JSON.stringify({
      visibility: 'true',
    });
  }
  try {
    const response = await fetch(`${url}/events`, config);
    if (response.status !== 200) {
      cachedEvents = [];
      return [];
    }
    if (!response.ok) throw new Error('Network response was not ok');
    cachedEvents = response.json();
  } catch (error) {
    cachedEvents = [];
  }
  return cachedEvents;
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
  try {
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
    if (response.status !== 200) return [];
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  } catch (error) {
    return [];
  }
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
  const cleanedMapNumber = mapNumber.toString().split(' ')[0];
  const imageUrl = `https://static.kacky.gg/${eventType}/thumbs/${cleanedMapNumber}.jpg`;
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

export async function getLeaderBoardPage(
  token,
  eventtype,
  edition,
  startrank,
  elements
) {
  const response = await fetch(
    `${url}/records/event/leaderboard/${eventtype}/${edition}?start=${startrank}&elems=${elements}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function getLeaderBoardPlayer(
  token,
  eventtype,
  edition,
  searchlogin
) {
  const response = await fetch(
    `${url}/records/event/leaderboard/${eventtype}/${edition}/${searchlogin}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    }
  );
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

export async function getMapInfo(eventtype, kackyid) {
  const response = await fetch(`${url}/mapinfo/${eventtype}/${kackyid}`, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function setMapInfo(token, eventtype, kackyid, data) {
  const response = await fetch(`${url}/mapinfo/${eventtype}/${kackyid}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function setEventInfo(token, data) {
  const response = await fetch(`${url}/manage/events`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function setMapInfoAdmin(token, data, overwrite) {
  const formData = new FormData();
  formData.append('file', data);
  if (overwrite === true) {
    formData.set(
      'overwrite',
      new Blob(['1'], {
        type: 'text/plain',
      })
    );
  }

  const response = await fetch(`${url}/manage/maps`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!response.ok) throw new Error(response.status.toString()); // Error('Network response was not ok');
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

export async function deleteAccount(token) {
  const response = await fetch(`${url}/usermgnt/delete`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}
