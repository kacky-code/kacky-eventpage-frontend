import React, { memo, useState } from 'react';

import PropTypes from 'prop-types';

import { Text, IconButton, HStack, useDisclosure } from '@chakra-ui/react';

import { MdOutlineImage } from 'react-icons/md';

import MapImageModal from '../../components/MapImageModal';

const MapNumberCell = memo(({ number, finished }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [renderImage, setRenderImage] = useState(false);

  return (
    <HStack
      w="100px"
      onMouseEnter={() => setRenderImage(true)}
      onMouseLeave={() => setRenderImage(false)}
      role="group"
      spacing={4}
    >
      <Text
        letterSpacing="0.1em"
        textShadow="glow"
        fontSize="xl"
        fontWeight="medium"
      >
        {number}
      </Text>
      {renderImage ? (
        <>
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
            author="placeholder"
            isFinished={finished}
            isOpen={isOpen}
            onClose={onClose}
          />
        </>
      ) : null}
    </HStack>
  );
});

MapNumberCell.propTypes = {
  number: PropTypes.string.isRequired,
  finished: PropTypes.bool,
};

MapNumberCell.defaultProps = {
  finished: false,
};

export default MapNumberCell;
