export function mergeSpreadsheetAndPBs(sheet, pb) {
  const formattedData = [];

  sheet.forEach(map => {
    const formattedMap = {
      finished: map.finished || false,
      number: map.kacky_id.toString(),
      author: map.author,
      difficulty: map.map_diff || 0,
      personalBest: 0,
      kackyRank: undefined,
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
    formattedData.push(formattedMap);
  });
  return formattedData;
}

export default mergeSpreadsheetAndPBs;
