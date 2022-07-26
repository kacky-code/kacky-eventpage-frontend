import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

const ColorModeSwitcher = () => {
  const { toggleColorMode } = useColorMode();

  const SwitchIcon = useColorModeValue(MdOutlineLightMode, MdOutlineDarkMode);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
    />
  );
};

export default ColorModeSwitcher;
