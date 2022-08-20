import React, { useContext } from 'react';
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

import AuthContext from '../../context/AuthContext';

// eslint-disable-next-line react/prop-types
const MapClipCell = ({ clip }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  // eslint-disable-next-line no-unused-vars
  const { authentication } = useContext(AuthContext);
  return (
    <HStack>
      <Link
        sx={
          (clip === '' || !authentication.isLoggedIn) && {
            pointerEvents: 'none',
          }
        }
        href={clip}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton
          disabled={clip === '' || !authentication.isLoggedIn}
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
            disabled={!authentication.isLoggedIn}
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
