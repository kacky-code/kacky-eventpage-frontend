import PropTypes from 'prop-types';

import {
  Center,
  Box,
  useColorMode,
  Flex,
  HStack,
  Text,
  Badge,
  Icon,
  CircularProgress,
  CircularProgressLabel,
  useTheme,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { DateTime } from 'luxon';
import {
  MdOutlineCheckCircle,
} from 'react-icons/md';
import MapImageModal from '../../components/MapImageModal';

import { getMapImageUrl } from '../../api/api';
import mapImageFallback from '../../assets/images/mapImageFallback.jpg';
import EventContext from '../../context/EventContext';
import { getDefaultBackgrounds } from '../../components/Header/Theming/BackgroundColors';

const nextMapsFontWeight = ['medium', 'normal', 'light'];

const diffBadgeColorArr = {
  white: { variant: 'white', text: 'White' },
  green: { variant: 'green', text: 'Green' },
  blue: { variant: 'blue', text: 'Blue' },
  red: { variant: 'red', text: 'Red' },
  black: { variant: 'black', text: 'Black' },
  hard: { variant: 'orange', text: 'Hard' },
  harder: { variant: 'red', text: 'Harder' },
  hardest: { variant: 'purple', text: 'Hardest' },
};

const ServerCard = ({
  serverNumber,
  serverDifficulty,
  maps,
  timeLimit,
  timeLeft,
}) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { event } = useContext(EventContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalNextMap1 = useDisclosure();
  const modalNextMap2 = useDisclosure();
  const modalNextMap3 = useDisclosure();

  const nextMapModals = [modalNextMap1, modalNextMap2, modalNextMap3];

  return (
    <Box
      bgImage={`url(${getMapImageUrl(
        event.type,
        maps[0].number
      )}), url(${mapImageFallback})`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      h={{ base: 'column', xl: 32 }}
    >
      <Box
        w="full"
        h="full"
        bgColor={`${
          colorMode === 'dark'
            ? getDefaultBackgrounds().dark[1]
            : getDefaultBackgrounds().light[1]
        }11`}
      >
        <Center
          px={{ base: 4, md: 8 }}
          w="full"
          h="full"
          bgGradient={{
            base: `linear(to-r, background 0%, ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[0]
                : getDefaultBackgrounds().light[0]
            }80 55%,  ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[1]
                : getDefaultBackgrounds().light[1]
            } 100%)`,
            md: `linear(to-r, ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[0]
                : getDefaultBackgrounds().light[0]
            }80 0%, ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[1]
                : getDefaultBackgrounds().light[1]
            }80 5560%,  ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[0]
                : getDefaultBackgrounds().light[0]
            }80 100%)`,
            xl: `linear(to-r, ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[0]
                : getDefaultBackgrounds().light[0]
            }80 0%, ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[1]
                : getDefaultBackgrounds().light[1]
            }80 55%, ${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[0]
                : getDefaultBackgrounds().light[0]
            }80 100%)`,
          }}
        >
          <Flex
            direction={{ base: 'column', xl: 'row' }}
            align={{ base: 'flex-start', xl: 'center' }}
            pl={{ base: 8, sm: 16, xl: 0 }}
            py={8}
            gap={{ base: 8, xl: 0 }}
            justify="space-between"
            w="container.xl"
          >
            {/* SERVER */}
            <HStack w="220px" spacing={4}>
              <Text
                textShadow="glow"
                w='85px'
                fontSize='5xl'
                lineHeight= '48px'
              >
                # {serverNumber}
              </Text>
              {serverDifficulty !== "" ?  // Servers do not have a difficulty in Phase 1
                <Badge width={'5rem'} fontSize={'xl'}
                  visibility={
                    serverDifficulty === 'undefined' ? 'hidden' : 'visible'
                  }
                  variant={diffBadgeColorArr[serverDifficulty] ? diffBadgeColorArr[serverDifficulty].variant : null}
                >
                  {serverDifficulty}
                </Badge>
                : null
              }
            </HStack>

            {/* MAP NUMBER */}
            <HStack w='320px'
                    onClick={onOpen} cursor="pointer" _hover={{ transform: 'scale(1.05)' }}>
              <Text
                fontSize='2xl'
                lineHeight='24px'
                letterSpacing="0.4em"
                fontWeight="light"
                align="right"
                textShadow="glow"
              >
                {event.type === 'kk' ? 'Kackiest' : 'Kacky'}
                <br />
                {event.type === 'kk' ? 'Kacky' : 'Reloaded'}
              </Text>
              <HStack spacing={0}>
                <Text
                  lineHeight='60px'
                  textShadow="glow"
                  fontSize='6xl'
                  letterSpacing="0.1em"
                  fontWeight="bold"
                >
                  {maps[0].number}
                </Text>
                {maps[0].finished ? (
                  <Icon
                    color={colorMode === 'dark' ? 'green.300' : 'green.500'}
                    boxSize="20px"
                    alignSelf="flex-start"
                    filter={
                      colorMode === 'dark'
                        ? theme.shadows.finGlowDark
                        : theme.shadows.finGlowLight
                    }
                    as={MdOutlineCheckCircle}
                  />
                ) : null}
              </HStack>
            </HStack>



            {/* NEXT MAPS */}
            <Flex
              direction='row'
              gap= {2}
              w='120px'
            >
              <Flex
                h='88px'
                direction='column'
                spacing={0}
                justify="stretch"
                align="center"
              >
                <Box
                  bg={colorMode === 'dark' ? 'white' : 'black'}
                  w='2px'
                  h='full'
                  boxShadow="glow"
                />
                <Box
                  filter={
                    colorMode === 'dark' ? theme.shadows.dropGlow : 'none'
                  }
                >
                  <svg
                    fill={colorMode === 'dark' ? 'white' : 'black'}
                    height="12px"
                    width="12px"
                  >
                    <polygon
                      points='0,0 12,0 6,12'
                    />
                  </svg>
                </Box>
              </Flex>
              <Flex
                direction='column'
                align="flex-start"
                gap={2}
              >
                {maps.slice(1).map((map, index) => (
                  <HStack
                    onClick={nextMapModals[index].onOpen}
                    cursor="pointer"
                    w='auto'
                    justify="flex-start"
                    _hover={{ transform: 'scale(1.05)' }}
                    spacing={1}
                    key={map.number}
                  >
                    <Text
                      lineHeight="24px"
                      fontWeight={nextMapsFontWeight[index]}
                      fontSize="2xl"
                      letterSpacing="0.1em"
                      textShadow="glow"
                    >
                      {map.number}
                    </Text>
                    {map.finished ? (
                      <Icon
                        color={colorMode === 'dark' ? 'green.300' : 'green.500'}
                        boxSize="20px"
                        filter={
                          colorMode === 'dark'
                            ? theme.shadows.finGlowDark
                            : theme.shadows.finGlowLight
                        }
                        as={MdOutlineCheckCircle}
                      />
                    ) : null}
                    <MapImageModal
                      mapNumber={map.number.toString()}
                      author={map.author}
                      isFinished={map.finished}
                      isOpen={nextMapModals[index].isOpen}
                      onClose={nextMapModals[index].onClose}
                      eventtype={event.type}
                    />
                  </HStack>
                ))}
              </Flex>
            </Flex>

            {/* TIME LEFT */}
            <Flex justify="center" align="center">
              {timeLeft <= 0 ? (
                <Text
                  align="center"
                  width='114px'
                  ml={4}
                  color="red.500"
                  _dark={{ color: 'red.300' }}
                  fontWeight="normal"
                  fontSize='md'
                  letterSpacing="0.1em"
                  m={0}
                >
                  Switching to next Map
                </Text>
              ) :  (
                <CircularProgress
                  trackColor="transparent"
                  thickness="2px"
                  color={colorMode === 'dark' ? 'white' : 'black'}
                  value={(timeLeft / timeLimit) * 100}
                  size="114px"
                >
                  <CircularProgressLabel
                    fontWeight="semilight"
                    fontSize="2xl"
                    letterSpacing="0.1em"
                    sx={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {DateTime.fromSeconds(timeLeft).toFormat('mm:ss')}
                  </CircularProgressLabel>
                </CircularProgress>
              )}
            </Flex>
          </Flex>
        </Center>
      </Box>
      <MapImageModal
        mapNumber={maps[0].number.toString()}
        author={maps[0].author}
        isFinished={maps[0].finished}
        isOpen={isOpen}
        onClose={onClose}
        eventtype={event.type}
      />
    </Box>
  );
};

ServerCard.propTypes = {
  serverNumber: PropTypes.string.isRequired,
  serverDifficulty: PropTypes.string.isRequired,
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

export default ServerCard;
