import React, { useContext, memo, useState } from 'react';
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
  Icon,
} from '@chakra-ui/react';

import {
  MdOutlinePlayCircle,
  MdAddCircleOutline,
  MdOutlineModeEdit,
} from 'react-icons/md';

import AuthContext from '../../context/AuthContext';

const MapClipCell = memo(({ clip }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { authentication } = useContext(AuthContext);
  const [renderPopOver, setRenderPopOver] = useState(false);
  return (
    <HStack
      w="100px"
      h="40px"
      onMouseEnter={() => setRenderPopOver(true)}
      onMouseLeave={() => setRenderPopOver(false)}
    >
      {renderPopOver || isOpen ? (
        <>
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
        </>
      ) : (
        clip !== '' && <Icon m={2} boxSize="24px" as={MdOutlinePlayCircle} />
      )}
    </HStack>
  );
});

MapClipCell.propTypes = {
  clip: PropTypes.string,
};

MapClipCell.defaultProps = {
  clip: '',
};

export default MapClipCell;
