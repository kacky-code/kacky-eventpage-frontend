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
import React from 'react';
import { DateTime } from 'luxon';
import {
  MdOutlineDns,
  MdOutlineCheckCircle,
  MdAccessTime,
} from 'react-icons/md';
import { BsArrowsAngleExpand } from 'react-icons/bs';
import MapImageModal from '../../components/MapImageModal';

const nextMapsFontWeight = ['medium', 'normal', 'light'];

const ServerCard = ({
  serverNumber,
  mapImageUrl,
  serverDifficulty,
  mapNumbers,
  timeLimit,
  timeLeft,
  mapsFinished,
  isCompactView,
}) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isFinished = mapNumber =>
    mapsFinished.filter(map => Object.keys(map).toString() === mapNumber)[0][
      mapNumber
    ];

  return (
    <Box
      bgImage={`url(${mapImageUrl})`}
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
                Kacky
                <br />
                Reloaded
              </Text>
              <HStack spacing={0}>
                <Text
                  lineHeight={isCompactView ? '48px' : '60px'}
                  textShadow="glow"
                  fontSize={isCompactView ? '5xl' : '6xl'}
                  letterSpacing="0.1em"
                  fontWeight="bold"
                >
                  {mapNumbers[0]}
                </Text>
                {isFinished(mapNumbers[0]) ? (
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
              <Image h={isCompactView ? 16 : 32} alt="Map" src={mapImageUrl} />
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
                mapNumber={mapNumbers[0]}
                mapImageUrl={mapImageUrl}
                isFinished={isFinished(mapNumbers[0])}
                isOpen={isOpen}
                onClose={onClose}
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
                {mapNumbers.slice(1).map((mapNumber, index) => (
                  <HStack
                    w={isCompactView ? '75px' : 'auto'}
                    justify="flex-start"
                    spacing={1}
                    key={mapNumber}
                  >
                    <Text
                      lineHeight="24px"
                      fontWeight={nextMapsFontWeight[index]}
                      fontSize="2xl"
                      letterSpacing="0.1em"
                      textShadow="glow"
                    >
                      {mapNumber}
                    </Text>
                    {isFinished(mapNumber) ? (
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
                  </HStack>
                ))}
              </Flex>
            </Flex>

            {/* TIME LEFT */}
            <Flex justify="center" align="center">
              {isCompactView ? (
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
  mapImageUrl: PropTypes.string.isRequired,
  serverDifficulty: PropTypes.string.isRequired,
  mapNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
  timeLimit: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
  mapsFinished: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.bool))
    .isRequired,
  isCompactView: PropTypes.bool.isRequired,
};

export default ServerCard;
