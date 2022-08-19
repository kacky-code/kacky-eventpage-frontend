/* eslint-disable no-return-assign */
import React from 'react';
import {
  Modal,
  ModalOverlay,
  Image,
  ModalContent,
  ModalCloseButton,
  Flex,
  HStack,
  Text,
  useColorMode,
  useTheme,
  Icon,
} from '@chakra-ui/react';

import { MdOutlineCheckCircle } from 'react-icons/md';

import PropTypes from 'prop-types';

import mapImageFallback from '../assets/images/mapImageFallback.jpg';
import { getMapImageUrl } from '../api/api';

const MapImageModal = ({ isOpen, onClose, author, mapNumber, isFinished }) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const getFallbackImage = ev => {
    // eslint-disable-next-line no-param-reassign
    ev.target.src = mapImageFallback;
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="1024px">
        <Image
          onError={getFallbackImage}
          alt="Map"
          src={getMapImageUrl(mapNumber)}
        />
        <Flex
          direction="column"
          role="group"
          w="full"
          h="full"
          p={4}
          align="flex-end"
          justify="flex-end"
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%);"
          bgGradient={
            colorMode === 'dark'
              ? 'linear(to-br, transparent 0%, transparent 50%, black 100%)'
              : 'linear(to-br, transparent 0%, transparent 50%, white 90%, white 100%)'
          }
        >
          <HStack w="320px">
            <Text
              fontSize="2xl"
              lineHeight="24px"
              letterSpacing="0.4em"
              fontWeight="light"
              align="right"
              textShadow="glow"
            >
              Kacky
              <br />
              Reloaded
            </Text>
            <HStack spacing="0">
              <Text
                lineHeight="60px"
                textShadow="glow"
                fontSize="6xl"
                letterSpacing="0.1em"
                fontWeight="bold"
              >
                {mapNumber}
              </Text>
              {isFinished ? (
                <Icon
                  color="green.300"
                  boxSize="20px"
                  alignSelf="flex-start"
                  filter={theme.shadows.finGlow}
                  as={MdOutlineCheckCircle}
                />
              ) : null}
            </HStack>
          </HStack>
          <HStack mr={10} py={2}>
            <Text fontWeight="hairline" textShadow="glow" letterSpacing="0.1em">
              by
            </Text>
            <Text fontWeight="normal" textShadow="glow" letterSpacing="0.1em">
              {author}
            </Text>
          </HStack>
          <ModalCloseButton
            boxSize="40px"
            borderRadius="full"
            bg="blackAlpha.800"
            _hover={{ bg: 'blackAlpha.600' }}
            color="white"
            m={2}
          />
        </Flex>
      </ModalContent>
    </Modal>
  );
};

MapImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mapNumber: PropTypes.number.isRequired,
  isFinished: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
};

export default MapImageModal;
