// TODO: merge mergeSpreadsheetAndPBs and mergeScheduleAndPBs into one function
export function mergeSpreadsheetAndPBs(sheet, pb) {
  const formattedData = [];

  sheet.forEach(map => {
    const formattedMap = {
      finished: map.finished || false,
      number: map.kacky_id.toString(),
      author: map.author,
      difficulty: map.map_diff || 0,
      rating: map.rating || 0,
      personalBest: 0,
      kackyRank: 0,
      clip: map.clip || '',
      discordPing: map.alarm || false,
      wrScore: map.wr_score,
      wrHolder: map.wr_holder
    };
    if (pb !== null && pb[formattedMap.number] !== undefined) {
      formattedMap.finished = true;
      formattedMap.personalBest = pb[formattedMap.number].score;
      formattedMap.kackyRank = pb[formattedMap.number].kacky_rank;
    }
    if (formattedMap.difficulty === 0) {
      if (formattedMap.rating !== 0) {
        // make a 1-5 difficulty out of the 1-100 rating
        formattedMap.difficulty = Math.floor(formattedMap.rating / 20) + 1;
      } else {
        formattedMap.difficulty = 0;
      }
    }
    if (formattedMap.difficulty > 5) {
      // clip difficulty to 5 (happens when rating === 100)
      // also handles illegal difficulty values from backend
      formattedMap.difficulty = 5;
    }
    formattedData.push(formattedMap);
  });
  return formattedData;
}

export function mergeScheduleAndPBs(sheet, pb) {
  const formattedData = [];

  sheet.forEach(map => {
    const formattedMap = {
      finished: map.finished || false,
      number: map.kacky_id.toString(),
      author: map.author,
      difficulty: map.map_diff || 0,
      rating: map.rating || 0,
      personalBest: 0,
      kackyRank: 0,
      clip: map.clip || '',
      discordPing: map.alarm || false,
      wrScore: map.wr_score,
      wrHolder: map.wr_holder,
      upcomingIn: map.upcomingIn,
      server: map.server
    };
    if (pb !== null && pb[formattedMap.number] !== undefined) {
      formattedMap.finished = true;
      formattedMap.personalBest = pb[formattedMap.number].score;
      formattedMap.kackyRank = pb[formattedMap.number].kacky_rank;
    }
    if (formattedMap.difficulty === 0) {
      if (formattedMap.rating !== 0) {
        // make a 1-5 difficulty out of the 1-100 rating
        formattedMap.difficulty = Math.floor(formattedMap.rating / 20) + 1;
      } else {
        formattedMap.difficulty = 0;
      }
    }
    if (formattedMap.difficulty > 5) {
      // clip difficulty to 5 (happens when rating === 100)
      // also handles illegal difficulty values from backend
      formattedMap.difficulty = 5;
    }
    formattedData.push(formattedMap);
  });
  return formattedData;
}

export default mergeSpreadsheetAndPBs;
