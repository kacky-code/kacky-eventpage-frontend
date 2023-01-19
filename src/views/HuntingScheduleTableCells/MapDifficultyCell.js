/* eslint-disable react/prop-types */
import React, { useContext, useState, memo } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  Badge,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useToast,
} from '@chakra-ui/react';

import { useMutation } from '@tanstack/react-query';

import AuthContext from '../../context/AuthContext';
import { postSpreadsheetData } from '../../api/api';

const diffBadgeColorArr = [
  { variant: 'undefined', text: 'undefined' },
  { variant: 'white', text: 'Free' },
  { variant: 'green', text: 'Easy' },
  { variant: 'yellow', text: 'Medium' },
  { variant: 'orange', text: 'Hard' },
  { variant: 'red', text: 'Lunatic' },
  { variant: 'purple', text: 'Imp' },
];

const MapDifficultyCell = memo(({ difficulty, rowIndex, table, mapId }) => {
  const { authentication } = useContext(AuthContext);
  const [renderMenuList, setRenderMenuList] = useState(false);

  const toast = useToast();

  let newDifficulty;
  const mutation = useMutation(data => postSpreadsheetData(data), {
    onSuccess: () => {
      table.options.meta.updateData(rowIndex, 'difficulty', newDifficulty);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An error occurred!',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const onSubmit = data => {
    newDifficulty = data.diff;
    mutation.mutate(data);
  };

  return (
    <Menu autoSelect={false}>
      <MenuButton
        onClick={() => setRenderMenuList(true)}
        disabled={!authentication.isLoggedIn}
        _hover={{ bg: 'whiteAlpha.200' }}
        pl={6}
        textAlign="left"
        w="full"
        h="full"
        borderRadius="none"
      >
        <Badge
          visibility={
            diffBadgeColorArr[difficulty].text === 'undefined'
              ? 'hidden'
              : 'visible'
          }
          variant={diffBadgeColorArr[difficulty].variant}
        >
          {diffBadgeColorArr[difficulty].text}
        </Badge>
      </MenuButton>
      {renderMenuList ? (
        <MenuList minW="0" w="140px" fontSize="xs">
          {diffBadgeColorArr.map((diff, index) => (
            <MenuItem
              onClick={() =>
                onSubmit({
                  mapid: parseInt(mapId, 10),
                  diff: index,
                  token: authentication.token,
                })
              }
              key={diff.text}
              px={6}
              h={10}
            >
              {diff.text === 'undefined' ? (
                <Text>none</Text>
              ) : (
                <Badge variant={diff.variant}>{diff.text}</Badge>
              )}
            </MenuItem>
          ))}
        </MenuList>
      ) : null}
    </Menu>
  );
});

MapDifficultyCell.propTypes = {
  difficulty: PropTypes.number,
};

MapDifficultyCell.defaultProps = {
  difficulty: 0,
};

export default MapDifficultyCell;
