import { VStack } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import HotbarCard from './components/HotbarCard';

const VerticalGlanceLayout = ({
  servers,
  counter,
  mapChangeEstimate,
  elemSpacing,
}) => (
  <VStack spacing={elemSpacing}>
    {servers.map((server, index) => (
      <HotbarCard
        {...server}
        timeLeft={counter[index] - mapChangeEstimate}
        key={server.serverNumber}
        style={{ transition: 'opacity 1s' }}
      />
    ))}
  </VStack>
);

VerticalGlanceLayout.propTypes = {
  servers: PropTypes.arrayOf(
    PropTypes.shape({
      serverNumber: PropTypes.string,
      maps: PropTypes.arrayOf(
        PropTypes.shape({
          number: PropTypes.number.isRequired,
          author: PropTypes.string.isRequired,
          finished: PropTypes.bool.isRequired,
        })
      ),
      serverDifficulty: PropTypes.string, // Change expected type to string
      timeLimit: PropTypes.number,
    })
  ).isRequired,
  counter: PropTypes.arrayOf(PropTypes.number).isRequired,
  mapChangeEstimate: PropTypes.number.isRequired,
  elemSpacing: PropTypes.number.isRequired,
};

export default VerticalGlanceLayout;
