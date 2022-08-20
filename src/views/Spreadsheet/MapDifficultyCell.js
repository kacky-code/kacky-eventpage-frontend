import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  Badge,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from '@chakra-ui/react';

import AuthContext from '../../context/AuthContext';

const diffBadgeColorArr = [
  { variant: 'undefined', text: 'undefined' },
  { variant: 'white', text: 'Free' },
  { variant: 'green', text: 'Easy' },
  { variant: 'yellow', text: 'Medium' },
  { variant: 'orange', text: 'Hard' },
  { variant: 'red', text: 'Lunatic' },
  { variant: 'purple', text: 'Imp' },
];

const MapDifficultyCell = ({ difficulty }) => {
  // eslint-disable-next-line no-unused-vars
  const { authentication } = useContext(AuthContext);
  const [currentDifficulty, setCurrentDifficulty] = useState(difficulty);

  return (
    <Menu autoSelect={false}>
      <MenuButton
        disabled={!authentication.isLoggedIn}
        _hover={{ bg: 'whiteAlpha.200' }}
        px={{ base: 0, lg: 6 }}
        textAlign="left"
        w="full"
        h="full"
        borderRadius="none"
      >
        <Badge
          visibility={
            diffBadgeColorArr[currentDifficulty].text === 'undefined'
              ? 'hidden'
              : 'visible'
          }
          variant={diffBadgeColorArr[currentDifficulty].variant}
        >
          {diffBadgeColorArr[currentDifficulty].text}
        </Badge>
      </MenuButton>
      <MenuList minW="0" w="140px" fontSize="xs">
        {diffBadgeColorArr.map((diff, index) => (
          <MenuItem
            onClick={() => setCurrentDifficulty(index)}
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
    </Menu>
  );
};

MapDifficultyCell.propTypes = {
  difficulty: PropTypes.number,
};

MapDifficultyCell.defaultProps = {
  difficulty: 0,
};

export default MapDifficultyCell;
