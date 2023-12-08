import PropTypes from 'prop-types';

import {
  Center,
  Box,
  useColorMode,
  Flex,
  HStack,
  Text,
  Icon,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { MdOutlineDns, MdSouth } from 'react-icons/md';

import { getMapImageUrl } from '../../../../api/api';
import mapImageFallback from '../../../../assets/images/mapImageFallback.jpg';
import EventContext from '../../../../context/EventContext';

// eslint-disable-next-line no-unused-vars
const HorizontalMinimalCard = ({ serverNumber, maps, timeLimit, timeLeft }) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { event } = useContext(EventContext);

  return (
    <Box
      bgImage={`url(${getMapImageUrl(
        event.type,
        maps[0].number
      )}), url(${mapImageFallback})`}
      bgPosition='center'
      bgRepeat='no-repeat'
      bgSize='cover'
      w='100px'
      h='175px'
      bgColor={
        colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(6,6,6,0.05)'
      }
    >
      <Center
        px={{ base: 4, md: 8 }}
        w='full'
        h='full'
        bgGradient={{
          base: `linear(to-r, background 0%, ${
            colorMode === 'dark' ? 'blackAlpha.800 40%' : 'whiteAlpha.900 40%'
          },  ${
            colorMode === 'dark' ? 'blackAlpha.600 100%' : 'whiteAlpha.700 100%'
          })`,
          md: `linear(to-r, background 0%, ${
            colorMode === 'dark' ? 'blackAlpha.800 40%' : 'whiteAlpha.900 40%'
          },  transparent 100%)`,
          xl: `linear(to-r, background, ${
            colorMode === 'dark' ? 'rgba(6,6,6,0.8)' : 'rgba(255,255,255,0.8)'
          }, background)`,
        }}
      >
        <Flex direction='column' align='center' justify='center'>
          {/* SERVER */}
          <HStack spacing={1}>
            <Icon
              filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
              fontSize={22}
              as={MdOutlineDns}
            />
            <Text fontSize='xl'>{serverNumber}</Text>
          </HStack>
          {/* NEXT MAPS */}
          <Box marginTop={2}>
            <VStack direction='row' align='flex-start' gap='5px'>
              <VStack w='auto' justify='center'>
                <Text
                  lineHeight='24px'
                  fontSize='2xl'
                  fontWeight='medium'
                  letterSpacing='0.1em'
                  color={
                    maps[0].finished
                      ? colorMode === 'dark'
                        ? 'green.300'
                        : 'green.500'
                      : ''
                  }
                >
                  {maps[0].number}
                </Text>
                <Icon
                  boxSize={5}
                  filter={
                    colorMode === 'dark' ? theme.shadows.dropGlow : 'none'
                  }
                  as={MdSouth}
                />
                <Text
                  lineHeight='24px'
                  fontSize='2xl'
                  fontWeight='medium'
                  letterSpacing='0.1em'
                  color={
                    maps[1].finished
                      ? colorMode === 'dark'
                        ? 'green.300'
                        : 'green.500'
                      : ''
                  }
                >
                  {maps[1].number}
                </Text>
              </VStack>
            </VStack>
          </Box>
          <Text pt={2}>
            {timeLeft > 0
              ? Math.floor(timeLeft / 60)
                  .toString()
                  .padStart(2, '0')
              : '00'}
            :
            {timeLeft > 0
              ? Math.floor(timeLeft % 60)
                  .toString()
                  .padStart(2, '0')
              : '00'}
          </Text>
        </Flex>
      </Center>
    </Box>
  );
};

HorizontalMinimalCard.propTypes = {
  serverNumber: PropTypes.string.isRequired,
  maps: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number,
      finished: PropTypes.bool,
      author: PropTypes.string,
    })
  ).isRequired,
  timeLimit: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
};

export default HorizontalMinimalCard;
