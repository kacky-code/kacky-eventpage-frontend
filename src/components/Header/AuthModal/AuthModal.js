/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Flex,
  useColorMode,
  useTheme,
  IconButton,
} from '@chakra-ui/react';

import { MdOutlineArrowBack } from 'react-icons/md';

// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Register from './Register';

const AuthModal = ({ isOpen, onClose }) => {
  // eslint-disable-next-line no-unused-vars
  const { colorMode } = useColorMode();
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();

  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState('login');

  return (
    <Modal
      onOverlayClick={() => setMode('login')}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="10px" />
      <ModalContent maxW="416px">
        <Flex
          direction="column"
          role="group"
          w="full"
          h="800px"
          px="48px"
          py="64px"
          align="center"
          justify="space-around"
        >
          {mode === 'login' ? <Login setMode={setMode} /> : null}
          {mode === 'resetPassword' ? (
            <ResetPassword setMode={setMode} />
          ) : null}
          {mode === 'register' ? <Register setMode={setMode} /> : null}

          <IconButton
            onClick={() => setMode('login')}
            borderRadius="full"
            top="8px"
            left="12px"
            position="absolute"
            variant="ghost"
            fontSize="xl"
            icon={<MdOutlineArrowBack />}
          />
          <ModalCloseButton
            onClick={() => setMode('login')}
            boxSize="40px"
            borderRadius="full"
          />
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
