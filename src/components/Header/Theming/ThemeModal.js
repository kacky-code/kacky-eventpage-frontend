import React, { useContext, useState } from 'react';
import {
  ModalCloseButton,
  Box,
  Grid,
  GridItem,
  Drawer,
  DrawerContent,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { getBackgrounds, getCurrentBGGradient } from './BackgroundColors';
import PreviewBox from './PreviewBox';
import ThemeContext from '../../../context/ThemeContext';

const ThemingModal = ({ isOpen, onClose }) => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(currentTheme.themename);

  const bgThemes = getBackgrounds();
  const stuff = [];

  // eslint-disable-next-line no-unused-vars,array-callback-return
  Object.keys(bgThemes.light).map((keyName, keyIndex) => {
    stuff.push([
      'Light',
      `${keyName}`,
      bgThemes.light[keyName][0],
      bgThemes.light[keyName][1],
    ]);
  });
  // eslint-disable-next-line no-unused-vars,array-callback-return
  Object.keys(bgThemes.dark).map((keyName, keyIndex) => {
    stuff.push([
      'Dark',
      `${keyName}`,
      bgThemes.dark[keyName][0],
      bgThemes.dark[keyName][1],
    ]);
  });

  const gridItems = [];

  const handleThemeSelect = (mode, name) => {
    const availBGs = getBackgrounds();
    if (
      !Object.keys(availBGs.light).includes(name) &&
      !Object.keys(availBGs.dark).includes(name)
    ) {
      return;
    }

    // localStorage.setItem('chakra-ui-color-mode', mode);
    localStorage.setItem('chakra-ui-color-mode', 'light');
    localStorage.setItem('chakra-ui-theme', name);
    setCurrentTheme({
      mode,
      themename: name,
      gradient: getCurrentBGGradient(),
    });

    const gradient =
      mode === 'dark' ? availBGs.dark[name] : availBGs.light[name];
    document.body.style.backgroundImage = `linear-gradient(${gradient[0]},${gradient[1]})`;
    setSelectedTheme(mode + name);
  };

  for (let i = 0; i < stuff.length; i += 1) {
    gridItems.push(
      <GridItem
        key={`${stuff[i][1]}-${i}`}
        colSpan={1}
        onClick={() => handleThemeSelect(stuff[i][0], stuff[i][1])}
      >
        <PreviewBox
          themeMode={stuff[i][0]}
          themeName={stuff[i][1]}
          gradientStart={stuff[i][2]}
          gradientEnd={stuff[i][3]}
          isSelected={selectedTheme === stuff[i][0] + stuff[i][1]}
        />
      </GridItem>
    );
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerContent maxW="50%" overflowY="auto">
        <Box w="full" h="full" px="48px" py="64px" scrollBehavior="smooth">
          <ModalCloseButton
            onClick={onClose}
            boxSize="40px"
            borderRadius="full"
          />
          <Grid templateColumns="repeat(5, 1fr)" gap={4}>
            {gridItems}
          </Grid>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};

ThemingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ThemingModal;
