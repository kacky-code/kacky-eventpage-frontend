import PropTypes from 'prop-types';

import {
  Center,
  Box,
  useColorMode,
  Flex,
  HStack,
  Text,
  Badge,
  Image,
  Icon,
  CircularProgress,
  CircularProgressLabel,
  useTheme,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { DateTime } from 'luxon';
import {
  MdOutlineDns,
  MdOutlineCheckCircle,
  MdAccessTime,
} from 'react-icons/md';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import MapImageModal from '../../components/MapImageModal';

import { getMapImageUrl } from '../../api/api';
import mapImageFallback from '../../assets/images/mapImageFallback.jpg';
import EventContext from '../../context/EventContext';

const nextMapsFontWeight = ['medium', 'normal', 'light'];

const ServerCard = ({
  serverNumber,
  serverDifficulty,
  maps,
  timeLimit,
  timeLeft,
  isCompactView,
}) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { event } = useContext(EventContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalNextMap1 = useDisclosure();
  const modalNextMap2 = useDisclosure();
  const modalNextMap3 = useDisclosure();

  const nextMapModals = [modalNextMap1, modalNextMap2, modalNextMap3];
  const getFallbackImage = ev => {
    // eslint-disable-next-line no-param-reassign
    ev.target.src = mapImageFallback;
  };

  return (
    <Box
      bgImage={`url(${getMapImageUrl(
        event.type, maps[0].number
      )}), url(${mapImageFallback})`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      w="full"
      h={{ base: 'column', xl: isCompactView ? 16 : 32 }}
    >
      <Box
        w="full"
        h="full"
        bgColor={
          colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(6,6,6,0.05)'
        }
      >
        <Center
          px={{ base: 4, md: 8 }}
          w="full"
          h="full"
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
              <Icon
                filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
                as={MdOutlineDns}
              />
              <Text textShadow="glow" letterSpacing="0.1em">
                Server
              </Text>
              <Text
                textShadow="glow"
                w={isCompactView ? '40px' : '50px'}
                fontSize={isCompactView ? '4xl' : '5xl'}
                lineHeight={isCompactView ? '36px' : '48px'}
              >
                {serverNumber}
              </Text>
              <Badge
                visibility={
                  serverDifficulty === 'undefined' ? 'hidden' : 'visible'
                }
                variant={serverDifficulty}
              >
                {serverDifficulty}
              </Badge>
            </HStack>

            {/* MAP NUMBER */}
            <HStack w={isCompactView ? '240px' : '320px'}>
              <Text
                fontSize={isCompactView ? 'md' : '2xl'}
                lineHeight={isCompactView ? '16px' : '24px'}
                letterSpacing="0.4em"
                fontWeight="light"
                align="right"
                textShadow="glow"
              >
                {event.type === "kk" ? "Kackiest" : "Kacky"}
                <br />
                {event.type === "kk" ? "Kacky" : "Reloaded"}
              </Text>
              <HStack spacing={0}>
                <Text
                  lineHeight={isCompactView ? '48px' : '60px'}
                  textShadow="glow"
                  fontSize={isCompactView ? '5xl' : '6xl'}
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

            {/* MAP IMAGE */}
            <Box display={{ base: 'none', xl: 'initial' }} position="relative">
              <Image
                h={isCompactView ? 16 : 32}
                alt="Map"
                onError={getFallbackImage}
                src={getMapImageUrl(event.type, maps[0].number)}
              />
              <Flex
                onClick={onOpen}
                role="group"
                w="full"
                h="full"
                align="center"
                justify="center"
                position="absolute"
                left="50%"
                top="50%"
                transform="translate(-50%, -50%);"
                transition="background-color 150ms ease-in-out"
                cursor="pointer"
                _hover={{
                  bg:
                    colorMode === 'dark' ? 'blackAlpha.600' : 'whiteAlpha.700',
                }}
              >
                <Icon
                  opacity="0"
                  transform="scale(0.5);"
                  transition="transform 100ms ease-in-out"
                  _groupHover={{
                    opacity: '1',
                    transform: 'scale(1);',
                  }}
                  filter={
                    colorMode === 'dark' ? theme.shadows.dropGlow : 'none'
                  }
                  boxSize={8}
                  as={BsArrowsAngleExpand}
                />
              </Flex>
              <MapImageModal
                mapNumber={maps[0].number}
                author={maps[0].author}
                isFinished={maps[0].finished}
                isOpen={isOpen}
                onClose={onClose}
                eventtype={event.type}
              />
            </Box>

            {/* NEXT MAPS */}
            <Flex
              direction={isCompactView ? 'column-reverse' : 'row'}
              gap={isCompactView ? 1 : 2}
              w={isCompactView ? 'auto' : '120px'}
            >
              <Flex
                h={isCompactView ? 'auto' : '88px'}
                direction={isCompactView ? 'row' : 'column'}
                spacing={0}
                justify="stretch"
                align="center"
              >
                <Box
                  bg={colorMode === 'dark' ? 'white' : 'black'}
                  w={isCompactView ? 'full' : '2px'}
                  h={isCompactView ? '2px' : 'full'}
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
                      points={isCompactView ? '0,0 12,6 0,12' : '0,0 12,0 6,12'}
                    />
                  </svg>
                </Box>
              </Flex>
              <Flex
                direction={isCompactView ? 'row' : 'column'}
                align="flex-start"
                gap={isCompactView ? 6 : 2}
              >
                {maps.slice(1).map((map, index) => (
                  <HStack
                    onClick={nextMapModals[index].onOpen}
                    cursor="pointer"
                    w={isCompactView ? '75px' : 'auto'}
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
                      mapNumber={map.number}
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
                  width={isCompactView ? '115px' : '114px'}
                  ml={4}
                  color="red.500"
                  _dark={{ color: 'red.300' }}
                  fontWeight="normal"
                  fontSize={isCompactView ? 'sm' : 'md'}
                  letterSpacing="0.1em"
                  m={0}
                >
                  Switching to next Map
                </Text>
              ) : isCompactView ? (
                <>
                  <Icon
                    filter={
                      colorMode === 'dark' ? theme.shadows.dropGlow : 'none'
                    }
                    boxSize="24px"
                    as={MdAccessTime}
                  />
                  <Text
                    align="left"
                    width="75px"
                    ml={4}
                    fontWeight="semilight"
                    fontSize="2xl"
                    lineHeight="24px"
                    letterSpacing="0.1em"
                    textShadow="glow"
                  >
                    {DateTime.fromSeconds(timeLeft).toFormat('mm:ss')}
                  </Text>
                </>
              ) : (
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
  isCompactView: PropTypes.bool.isRequired,
};

export default ServerCard;
