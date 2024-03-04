const light = {
  'Celadon-Melon': ['#ffbda5', '#9be5c3'],
  'Celadon-Plum': ['#e792d3', '#9be5c3'],
  'Celadon-UranianBlue': ['#bce6fd', '#9be5c3'],
  'Celadon-Vanilla': ['#f5e8a3', '#9be5c3'],
  Celadon: ['#9be5c3', '#9be5c3'],
  'Melon-Celadon': ['#9be5c3', '#ffbda5'],
  'Melon-UranianBlue': ['#bce6fd', '#ffbda5'],
  'Melon-Plum': ['#e792d3', '#ffbda5'],
  'Melon-Vanilla': ['#f5e8a3', '#ffbda5'],
  Melon: ['#ffbda5', '#ffbda5'],
  'Plum-Celadon': ['#9be5c3', '#e792d3'],
  'Plum-Melon': ['#ffbda5', '#e792d3'],
  'Plum-UranianBlue': ['#bce6fd', '#e792d3'],
  'Plum-Vanilla': ['#f5e8a3', '#e792d3'],
  Plum: ['#e792d3', '#e792d3'],
  'UranianBlue-Celadon': ['#9be5c3', '#bce6fd'],
  'UranianBlue-Melon': ['#ffbda5', '#bce6fd'],
  'UranianBlue-Plum': ['#e792d3', '#bce6fd'],
  'UranianYellow-Plum': ['#FFFCCE', '#FFFAA6'],
  'UranianBlue-Vanilla': ['#f5e8a3', '#bce6fd'],
  UranianBlue: ['#bce6fd', '#bce6fd'],
  'Vanilla-Celadon': ['#9be5c3', '#f5e8a3'],
  'Vanilla-Melon': ['#ffbda5', '#f5e8a3'],
  'Vanilla-Plum': ['#e792d3', '#f5e8a3'],
  'Vanilla-UranianBlue': ['#bce6fd', '#f5e8a3'],
  Vanilla: ['#f5e8a3', '#f5e8a3'],
};

const dark = {
  'Celadon-Melon': ['#d74e41', '#3e6f51'],
  'Celadon-Plum': ['#71395d', '#3d6f51'],
  'Celadon-UranianBlue': ['#4d71ba', '#3d7052'],
  'Celadon-Vanilla': ['#8d7440', '#3d7051'],
  Celadon: ['#3d7051', '#3d7051'],
  'Melon-Celadon': ['#3e6f51', '#c24e42'],
  'Melon-Plum': ['#74395c', '#ed4d42'],
  'Melon-UranianBlue': ['#4e70b0', '#cd4e42'],
  'Melon-Vanilla': ['#917340', '#fa4e41'],
  Melon: ['#ff4e41', '#ff4e41'],
  'Plum-Celadon': ['#3d6e51', '#71395d'],
  'Plum-Melon': ['#ec4d42', '#74395c'],
  'Plum-UranianBlue': ['#4e70bc', '#72395e'],
  Plum: ['#73395d', '#73395d'],
  'Plum-Vanilla': ['#907141', '#733a5c'],
  'UranianBlue-Celadon': ['#3d7052', '#4d71bf'],
  'UranianBlue-Melon': ['#de4e42', '#4e70b5'],
  'UranianBlue-Plum': ['#713a5e', '#4e6eb5'],
  'UranianYellow-Plum': ['#0F0E00', '#222000'],
  'UranianBlue-Vanilla': ['#8f7441', '#4e71bc'],
  UranianBlue: ['#4d71c3', '#4d71c3'],
  'Vanilla-Celadon': ['#3e7051', '#887441'],
  'Vanilla-Melon': ['#fa4e41', '#917240'],
  'Vanilla-Plum': ['#73395c', '#917241'],
  Vanilla: ['#917440', '#917440'],
  'Vanilla-UranianBlue': ['#4e71b7', '#8e7441'],
};

export function getCurrentBG() {
  const currentMode = localStorage.getItem('chakra-ui-color-mode') || undefined;
  const currentTheme = localStorage.getItem('chakra-ui-theme') || undefined;

  if (
    currentTheme === undefined ||
    currentMode === undefined ||
    (!Object.keys(light).includes(currentTheme) &&
      !Object.keys(dark).includes(currentTheme))
  ) {
    localStorage.setItem('chakra-ui-theme', 'UranianYellow-Plum');
    localStorage.setItem('chakra-ui-color-mode', 'dark');
  }

  return currentMode === 'dark' ? dark[currentTheme] : light[currentTheme];
}

export function getCurrentBGGradient() {
  const curtheme = getCurrentBG();
  return `linear-gradient(${curtheme[0]}, ${curtheme[1]});`;
}

export function getBackgrounds() {
  return { light, dark };
}

export function getDefaultBackgrounds() {
  return {
    light: [light['UranianYellow-Plum'][0], light['UranianYellow-Plum'][1]],
    dark: [dark['UranianYellow-Plum'][0], dark['UranianYellow-Plum'][1]],
    lightGradient: `linear-gradient(${light['UranianYellow-Plum'][0]}, ${light['UranianYellow-Plum'][1]});`,
    darkGradient: `linear-gradient(${dark['UranianYellow-Plum'][0]}, ${dark['UranianYellow-Plum'][1]});`,
  };
}
