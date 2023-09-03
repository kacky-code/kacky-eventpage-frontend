import { HStack } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import HotbarCard from './components/HotbarCard';

const VerticalGlanceLayout = ({
  servers,
  counter,
  mapChangeEstimate,
  elemSpacing,
}) => (
  <HStack spacing={elemSpacing}>
    {servers.map((server, index) => (
      <HotbarCard
        {...server}
        timeLeft={counter[index] - mapChangeEstimate}
        key={server.serverNumber}
        style={{ transition: 'opacity 1s' }}
      />
    ))}
  </HStack>
);

VerticalGlanceLayout.propTypes = {
  servers: PropTypes.arrayOf(
    PropTypes.shape({
      serverNumber: PropTypes.string,
      maps: PropTypes.arrayOf(PropTypes.number),
      serverDifficulty: PropTypes.number,
      timeLimit: PropTypes.number,
    })
  ).isRequired,
  counter: PropTypes.arrayOf(PropTypes.number).isRequired,
  mapChangeEstimate: PropTypes.number.isRequired,
  elemSpacing: PropTypes.number.isRequired,
};

export default VerticalGlanceLayout;
