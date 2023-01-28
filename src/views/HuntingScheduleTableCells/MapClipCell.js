/* eslint-disable react/prop-types */
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
  useToast,
} from '@chakra-ui/react';

import {
  MdOutlinePlayCircle,
  MdAddCircleOutline,
  MdOutlineModeEdit,
} from 'react-icons/md';

import { useMutation } from '@tanstack/react-query';

import AuthContext from '../../context/AuthContext';
import { postSpreadsheetData } from '../../api/api';

const MapClipCell = memo(({ clip, eventtype, rowIndex, table, mapId }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { authentication } = useContext(AuthContext);
  const [renderPopOver, setRenderPopOver] = useState(false);

  const toast = useToast();

  const [currentClip, setCurrentClip] = useState(clip);
  const mutation = useMutation(data => postSpreadsheetData(data, eventtype), {
    onSuccess: () => {
      table.options.meta.updateData(rowIndex, 'clip', currentClip);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `An error occurred!${  error}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const onSubmit = () => {
    mutation.mutate({
      mapid: mapId,
      clip: currentClip,
      token: authentication.token,
    });
    onClose();
  };

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
                <Input
                  onChange={e => setCurrentClip(e.target.value)}
                  placeholder="Enter Clip Url"
                  defaultValue={clip}
                />
                <Button disabled={currentClip === clip} onClick={onSubmit}>
                  Save
                </Button>
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
  eventtype: PropTypes.string.isRequired,
};

MapClipCell.defaultProps = {
  clip: '',
};

export default MapClipCell;
