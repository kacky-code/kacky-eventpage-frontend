import React, { memo, useContext } from 'react';
import { Text, Flex, Center, Spacer, useDisclosure, Box } from '@chakra-ui/react';
import PropTypes, { bool, number, string } from 'prop-types';
import { LazyLoadImage } from "react-lazy-load-image-component";

import { getMapImageUrl } from "../../api/api"
import MapDiscordCell from './MapDiscordCell';
import MapDifficultyCell from './MapDifficultyCell';
import MapClipCell from './MapClipCell';
import MapImageModal from '../../components/MapImageModal';
import mapImageFallback from '../../assets/images/mapImageFallback.jpg';
import AuthContext from '../../context/AuthContext';
import MapWRCell from './MapWRCell';
import MapPBCell from './MapPBCell';

const MapDetailCell = memo(({ data, mode, eventtype, edition, table, rowIndex }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getFallbackImage = ev => {
    // eslint-disable-next-line no-param-reassign
    ev.target.src = mapImageFallback;
  };

  const { authentication } = useContext(AuthContext);

  return (
    <Flex
      color='white'
      margin={3}
    >
      <Center display={{ base: 'none', xl: 'initial' }} position="relative" w="427px" marginRight={10}>
        <LazyLoadImage
          w="427px"
          alt="Map"
          onError={getFallbackImage}
          PlaceholderSrc={getFallbackImage}
          src={getMapImageUrl(eventtype, data.number)}
          onClick={onOpen}
        />
        <MapImageModal
          mapNumber={data.number}
          author={data.author}
          isFinished={data.finished}
          isOpen={isOpen}
          onClose={onClose}
          eventtype={eventtype}
        />
      </Center>
      <Flex direction="column" justifyContent='space-around' alignContent='center'>
        <Flex alignContent='center' height="40px" align="center">
          <Text
            width="200px"
            textShadow="glow"
            letterSpacing="0.2em"
            fontSize="lg"
            fontWeight="400"
            mixBlendMode="difference"
          >
            Author:
          </Text>
          <Text mixBlendMode="difference">{data.author}</Text>
        </Flex>
        <Flex alignContent='center' height="40px" align="center">
          <MapWRCell wrScore={data.wrScore} wrHolder={data.wrHolder} />
        </Flex>
        <Flex height="40px" align="center">
          <MapPBCell personalBest={data.personalBest} wrHolder={data.wrHolder} kackyRank={data.kackyRank} />
        </Flex>
      </Flex>
      <Spacer />
      {authentication.isLoggedIn ?
        <Flex marginLeft="20" direction="column" justifyContent='space-around'>
          <Flex alignContent='center' height="40px" align="center">
            <Text
              width="200px"
              textShadow="glow"
              letterSpacing="0.2em"
              fontSize="lg"
              fontWeight="400"
              mixBlendMode="difference"
            >
              Difficulty:
            </Text>
            <MapDifficultyCell difficulty={data.difficulty} mapId={data.number} eventtype={eventtype} edition={edition} table={table} rowIndex={rowIndex}/>
          </Flex>
          <Flex height="40px" align="center">
            <Text
              width="200px"
              textShadow="glow"
              letterSpacing="0.2em"
              fontSize="lg"
              fontWeight="400"
              mixBlendMode="difference"
            >
              Clip:
            </Text>
            <MapClipCell
              clip={data.clip}
              mapId={data.number}
              eventtype={eventtype}
              edition={edition}
              rowIndex={rowIndex}
              table={table}
            />
          </Flex>
          <Flex alignContent='center' height="40px" align="center">
            <Box display={mode === "hunting" ? "none" : "inherit"} >
              <Text
                width="200px"
                textShadow="glow"
                letterSpacing="0.2em"
                fontSize="lg"
                fontWeight="400"
                mixBlendMode="difference"
              >
                Discord Alarm:
              </Text>
              <MapDiscordCell discordPing={data.discordPing} eventtype={eventtype} edition={edition} table={table} rowIndex={rowIndex} />
            </Box>
          </Flex>
        </Flex>
      :
        <Box width="400px" />
      }
    </Flex>
  )
});

MapDetailCell.propTypes = {
  data: PropTypes.shape({
    finished: bool.isRequired,
    number: string.isRequired,
    author: string.isRequired,
    difficulty: number.isRequired,
    personalBest: number.isRequired,
    kackyRank: number.isRequired,
    clip: string.isRequired,
    discordPing: bool.isRequired,
    wrScore: number.isRequired,
    wrHolder: string.isRequired
  }).isRequired,
  eventtype: string.isRequired,
  edition: number.isRequired,
  mode: string.isRequired,
  table: PropTypes.element.isRequired,
  rowIndex: number.isRequired,
};

export default MapDetailCell;