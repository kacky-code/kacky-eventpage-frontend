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
  Progress,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import {
  MdOutlineDns,
  MdArrowRightAlt,
} from 'react-icons/md';

import { getMapImageUrl } from '../../api/api';
import mapImageFallback from '../../assets/images/mapImageFallback.jpg';
import EventContext from '../../context/EventContext';

const HotbarCard = ({
                      serverNumber,
                      maps,
                      timeLimit,
                      timeLeft,
                    }) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { event } = useContext(EventContext);

  return (
    <Box
      bgImage={`url(${getMapImageUrl(
        event.type, maps[0].number,
      )}), url(${mapImageFallback})`}
      bgPosition='center'
      bgRepeat='no-repeat'
      bgSize='cover'
      w='200px'
      h='100px'
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
            colorMode === 'dark'
              ? 'blackAlpha.600 100%'
              : 'whiteAlpha.700 100%'
          })`,
          md: `linear(to-r, background 0%, ${
            colorMode === 'dark' ? 'blackAlpha.800 40%' : 'whiteAlpha.900 40%'
          },  transparent 100%)`,
          xl: `linear(to-r, background, ${
            colorMode === 'dark' ? 'rgba(6,6,6,0.8)' : 'rgba(255,255,255,0.8)'
          }, background)`,
        }}
      >
        <Flex
          direction='column'
          align='center'
          justify='center'
        >
          {/* SERVER */}
          <HStack spacing={1}>
            <Icon
              filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
              as={MdOutlineDns}
            />
            <Text>
              Server {serverNumber}
            </Text>
          </HStack>

          {/* NEXT MAPS */}
          <Box
            marginTop={3}
          >
            <Flex
              direction='row'
              align='flex-start'
              gap='10px'
            >
              {maps.slice(0, 2).map((map, index) => (
                <HStack
                  w='auto'
                  justify='center'
                  key={map.number}
                >
                  {console.log(map)}
                  <Text
                    lineHeight='24px'
                    fontSize='2xl'
                    fontWeight="medium"
                    letterSpacing='0.1em'
                    color={map.finished ? (colorMode === 'dark' ? 'green.300' : 'green.500') : ""}
                  >
                    {map.number}
                  </Text>
                  {index === 0 ? (
                    <Icon
                      boxSize={5}
                      filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
                      as={MdArrowRightAlt}
                    />
                  ) : null}
                </HStack>
              ))}
            </Flex>
            <Progress
              filter={
                colorMode === 'dark' ? theme.shadows.dropGlow : 'none'
              }
              value={100 - (timeLeft / timeLimit) * 100}
              orientation='horizontal'
              colorScheme='gray'
              size='md'
              outline={colorMode}
              marginTop='10px'
            />
          </Box>
        </Flex>
      </Center>
    </Box>
  );
};

HotbarCard.propTypes = {
  serverNumber: PropTypes.string.isRequired,
  maps: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number,
      finished: PropTypes.bool,
      author: PropTypes.string,
    }),
  ).isRequired,
  timeLimit: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
};

export default HotbarCard;
