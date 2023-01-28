import React, { memo } from 'react';
import { Image, Text, Flex, Center, Spacer, useDisclosure, Box } from '@chakra-ui/react';
import PropTypes, { bool, number, string } from 'prop-types';

import { getMapImageUrl } from "../../api/api"
import MapDiscordCell from './MapDiscordCell';
import MapDifficultyCell from './MapDifficultyCell';
import MapClipCell from './MapClipCell';
import MapImageModal from '../../components/MapImageModal';
import mapImageFallback from '../../assets/images/mapImageFallback.jpg';

const MapDetailCell = memo(({ data, mode, eventtype, edition, table, rowIndex }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getFallbackImage = ev => {
    // eslint-disable-next-line no-param-reassign
    ev.target.src = mapImageFallback;
  };

  return (
    <Flex
      color='white'
      margin={3}
    >
      <Center display={{ base: 'none', xl: 'initial' }} position="relative">
        <Image
          h="240px"
          alt="Map"
          onError={getFallbackImage}
          src={getMapImageUrl(eventtype, data.number)}
          onClick={onOpen}
          // display="none" - TODO: change this to "block" on onOpen. "none" in onClose
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
      <Spacer />
      <Flex direction="column" justifyContent='space-around'>
        <Flex>
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
          <Text>{data.author}</Text>
          <Spacer />
        </Flex>
        <Flex>
          <Text
            width="200px"
            textShadow="glow"
            letterSpacing="0.2em"
            fontSize="lg"
            fontWeight="400"
          >
            World Record:
          </Text>
          <Text>{(data.wrScore / 1000).toFixed(3)} by {data.wrHolder}</Text>
        </Flex>
        <Flex>
          <Text
            width="200px"
            textShadow="glow"
            letterSpacing="0.2em"
            fontSize="lg"
            fontWeight="400"
          >
            Personal Best:
          </Text>
          <Text>
            {data.personalBest !== 0 ? `${(data.personalBest / 1000).toFixed(3)  } (Rank ${  data.kackyRank.toString()  })` : "No PB"}
          </Text>
          <Spacer />
        </Flex>
      </Flex>
      <Spacer />
      <Flex direction="column" justifyContent='space-around'>
        <Flex>
          <Text
            width="200px"
            textShadow="glow"
            letterSpacing="0.2em"
            fontSize="lg"
            fontWeight="400"
          >
            Difficulty:
          </Text>
          <MapDifficultyCell difficulty={data.difficulty} mapId={data.number} eventtype={eventtype} edition={edition} table={table} rowIndex={rowIndex}/>
        </Flex>
        <Flex align='center'>
          <Text
            width="200px"
            textShadow="glow"
            letterSpacing="0.2em"
            fontSize="lg"
            fontWeight="400"
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
        <Flex>
          <Box display={mode === "hunting" ? "none" : "inherit"}>
            <Text
              width="200px"
              textShadow="glow"
              letterSpacing="0.2em"
              fontSize="lg"
              fontWeight="400"
            >
              Discord Alarm:
            </Text>
            <MapDiscordCell discordPing={data.discordPing} eventtype={eventtype} edition={edition} table={table} rowIndex={rowIndex} />
          </Box>
        </Flex>
      </Flex>
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