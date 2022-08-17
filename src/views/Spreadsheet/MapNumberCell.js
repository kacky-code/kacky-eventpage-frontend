import React from 'react';

import PropTypes from 'prop-types';

import { Text, IconButton, HStack, useDisclosure } from '@chakra-ui/react';

import { MdOutlineImage } from 'react-icons/md';

import MapImageModal from '../../components/MapImageModal';

const MapNumberCell = ({ number, finished, mapImageUrl }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack w="full" role="group" spacing={4}>
      <Text
        letterSpacing="0.1em"
        textShadow="glow"
        fontSize="xl"
        fontWeight="medium"
      >
        {number}
      </Text>
      <IconButton
        onClick={onOpen}
        visibility={{ base: 'visible', lg: 'hidden' }}
        _groupHover={{
          visibility: 'visible',
        }}
        icon={<MdOutlineImage fontSize="24px" />}
      />
      <MapImageModal
        mapNumber={number}
        mapImageUrl={mapImageUrl}
        isFinished={finished}
        isOpen={isOpen}
        onClose={onClose}
      />
    </HStack>
  );
};

MapNumberCell.propTypes = {
  number: PropTypes.string.isRequired,
  finished: PropTypes.bool,
  mapImageUrl: PropTypes.string.isRequired,
};

MapNumberCell.defaultProps = {
  finished: false,
};

export default MapNumberCell;
