import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types,no-unused-vars
const PreviewBox = ({
  themeMode,
  themeName,
  gradientStart,
  gradientEnd,
  isSelected,
}) => (
  <Box border="1px" borderColor={isSelected ? 'white' : 'rgba(0, 0, 0, 0)'}>
    <Box width="full" height="full" p={1}>
      <Box
        bg={`linear-gradient(${gradientStart}, ${gradientEnd})`}
        height={50}
      />
      <Center>
        <Text style={{ textAlign: 'center' }}>
          {themeMode}
          <br />
          {themeName}
        </Text>
      </Center>
    </Box>
  </Box>
);

PreviewBox.propTypes = {
  themeMode: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
  gradientStart: PropTypes.string.isRequired,
  gradientEnd: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default PreviewBox;
