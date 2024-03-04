import PropTypes from 'prop-types';

import {
  Center,
  Badge,
  Box,
  useColorMode,
  Flex,
  HStack,
  Text,
  Icon,
  useTheme,
  VStack,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { MdOutlineDns, MdSouth } from 'react-icons/md';
import { motion } from 'framer-motion';

import { getMapImageUrl } from '../../api/api';
import mapImageFallback from '../../assets/images/mapImageFallback.jpg';
import EventContext from '../../context/EventContext';

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
      w='150px'
      h='150px'
      bgColor={
        colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(6,6,6,0.05)'
      }
      position='relative'
    >
      {/* SERVER */}
      <HStack
        spacing={1}
        p={1}
        borderRadius='5px'
        position='absolute'
        top={0}
        left={0}
        bg={
          colorMode === 'dark'
            ? 'rgba(0, 0, 0, 0.3)'
            : 'rgba(255, 255, 255, 0.3)'
        }
      >
        <Icon
          filter={colorMode === 'dark' ? theme.shadows.dropGlow : 'none'}
          fontSize={22}
          as={MdOutlineDns}
        />
        <Text fontSize='xl'>{serverNumber}</Text>
      </HStack>
      <Badge
        position='absolute'
        bottom={0}
        right={0}
        p={1}
        m={1}
        fontWeight='medium'
        variant={timeLeft < 60 ? 'red' : timeLeft < 300 ? 'yellow' : 'green'}
      >
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
      </Badge>
      <Center
        w='full'
        h='full'
        bgGradient={{
          base: `radial(ellipse at center, background 0%, ${
            colorMode === 'dark' ? 'blackAlpha.800 40%' : 'whiteAlpha.900 40%'
          }, ${
            colorMode === 'dark' ? 'blackAlpha.600 100%' : 'whiteAlpha.700 100%'
          })`,
          md: `radial(ellipse at center, background 0%, ${
            colorMode === 'dark' ? 'blackAlpha.800 40%' : 'whiteAlpha.900 40%'
          }, transparent 100%)`,
          xl: `linear(to-r, background, ${
            colorMode === 'dark' ? 'rgba(6,6,6,0.8)' : 'rgba(255,255,255,0.8)'
          }, background)`,
        }}
      >
        <Flex
          direction='row'
          align='center'
          justify='center'
          position='relative'
        >
          <motion.div
            key='timer'
            initial={{ opacity: 0, scale: 0.9, position: 'absolute' }} // Start slightly shrunk
            animate={{ opacity: 1, scale: 1, position: 'absolute' }}
            exit={{ opacity: 0, scale: 1.1, position: 'absolute' }} // End slightly enlarged
            transition={{ duration: 0.5 }}
          >
            <CircularProgress
              trackColor='transparent'
              thickness='5px'
              color={colorMode === 'dark' ? 'white' : 'black'}
              value={timeLeft > 0 ? (timeLeft / timeLimit) * 100 : '0'}
              size='114px'
            >
              <CircularProgressLabel
                fontWeight='semilight'
                fontSize='2xl'
                letterSpacing='0.1em'
                sx={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {/* NEXT MAPS */}
                <Box>
                  <VStack
                    w='auto'
                    align='center'
                    justify='center'
                    direction='column'
                    spacing={0}
                  >
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
                </Box>
              </CircularProgressLabel>
            </CircularProgress>
          </motion.div>
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
