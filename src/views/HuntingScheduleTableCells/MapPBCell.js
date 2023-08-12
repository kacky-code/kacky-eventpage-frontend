import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import React, { memo, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const MapPBCell = memo(({ personalBest, kackyRank, wrHolder }) => {
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
        {authentication.isLoggedIn ? <>Personal Best:</> : <>WR Holder:</>}
      </Text>
      <Text mixBlendMode="difference" lineHeight="6">
        {authentication.isLoggedIn
          ? personalBest !== 0
            ? `${DateTime.fromMillis(personalBest).toFormat(
                'mm:ss.SSS'
              )} (Rank ${kackyRank.toString()})`
            : '-'
          : wrHolder}
      </Text>
    </>
  );
});

MapPBCell.propTypes = {
  personalBest: PropTypes.number.isRequired,
  kackyRank: PropTypes.number.isRequired,
  wrHolder: PropTypes.string.isRequired,
};

export default MapPBCell;
