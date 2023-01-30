import React, { memo, useContext, useState } from 'react';

import PropTypes from 'prop-types';

import { Text, IconButton, HStack, useDisclosure } from '@chakra-ui/react';

import { MdOutlineImage } from 'react-icons/md';

import MapImageModal from '../../components/MapImageModal';
import EventContext from '../../context/EventContext';

const MapNumberCell = memo(({ number, finished, author, eventtype }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [renderImage, setRenderImage] = useState(false);

  const { event } = useContext(EventContext);

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
        fontSize="l"
      >
        {number}
      </Text>
      {eventtype !== "hunting" && renderImage ? (
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
            mapNumber={parseInt(number, 10)}
            author={author}
            isFinished={finished}
            isOpen={isOpen}
            onClose={onClose}
            eventtype={event.type}
          />
        </>
      ) : null}
    </HStack>
  );
});

MapNumberCell.propTypes = {
  number: PropTypes.string.isRequired,
  finished: PropTypes.bool,
  author: PropTypes.string.isRequired,
  eventtype: PropTypes.string,
};

MapNumberCell.defaultProps = {
  finished: false,
  eventtype: "hunting"
};

export default MapNumberCell;
