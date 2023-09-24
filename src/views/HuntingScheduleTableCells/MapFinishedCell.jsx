import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Icon, useTheme, useColorMode } from '@chakra-ui/react';

import { MdOutlineCheckCircle } from 'react-icons/md';

const MapFinishedCell = memo(({ finished }) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Icon
      color={
        colorMode === 'dark'
          ? finished
            ? 'green.300'
            : 'whiteAlpha.200'
          : finished
          ? 'green.500'
          : 'blackAlpha.200'
      }
      boxSize='20px'
      alignSelf='flex-start'
      filter={
        colorMode === 'dark' && finished
          ? theme.shadows.finGlowDark
          : theme.shadows.finGlowLight
      }
      as={MdOutlineCheckCircle}
    />
  );
});

MapFinishedCell.propTypes = {
  finished: PropTypes.bool,
};

MapFinishedCell.defaultProps = {
  finished: false,
};

export default MapFinishedCell;
