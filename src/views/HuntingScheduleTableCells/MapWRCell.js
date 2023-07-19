import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import React, { memo, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const MapWRCell = memo(({ wrScore, wrHolder }) => {
  const { authentication } = useContext(AuthContext);

  return (
    <>
      <Text
        width="200px"
        textShadow="glow"
        letterSpacing="0.2em"
        fontSize="lg"
        fontWeight="400"
        mixBlendMode="difference"
      >
        World Record:
      </Text>
      <Text mixBlendMode="difference" lineHeight="6">
        {wrScore !== 0
          ? DateTime.fromMillis(wrScore).toFormat('mm:ss.SSS')
          : '-'}
        {authentication.isLoggedIn ? (
          <>
            <br />
            by {wrHolder !== '' ? wrHolder : '-'}
          </>
        ) : null}
      </Text>
    </>
  );
});

MapWRCell.propTypes = {
  wrScore: PropTypes.number.isRequired,
  wrHolder: PropTypes.string.isRequired,
};

export default MapWRCell;
