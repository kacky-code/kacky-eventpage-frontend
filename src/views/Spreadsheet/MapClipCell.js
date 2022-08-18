import React from 'react';
import PropTypes from 'prop-types';

import {
  IconButton,
  HStack,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Button,
  Link,
} from '@chakra-ui/react';

import {
  MdOutlinePlayCircle,
  MdAddCircleOutline,
  MdOutlineModeEdit,
} from 'react-icons/md';

// eslint-disable-next-line react/prop-types
const MapClipCell = ({ clip }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <HStack>
      <Link
        sx={clip === '' && { pointerEvents: 'none' }}
        href={clip}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton
          disabled={clip === ''}
          icon={<MdOutlinePlayCircle fontSize="24px" />}
        />
      </Link>
      <Popover
        placement="right"
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
      >
        <PopoverTrigger>
          <IconButton
            onClick={onOpen}
            icon={
              clip === '' ? (
                <MdAddCircleOutline fontSize="24px" />
              ) : (
                <MdOutlineModeEdit fontSize="24px" />
              )
            }
          />
        </PopoverTrigger>
        <PopoverContent>
          <HStack>
            <Input placeholder="Enter Clip Url" defaultValue={clip} />
            <Button onClick={onClose}>Save</Button>
          </HStack>
        </PopoverContent>
      </Popover>
    </HStack>
  );
};

MapClipCell.propTypes = {
  clip: PropTypes.string,
};

MapClipCell.defaultProps = {
  clip: '',
};

export default MapClipCell;
