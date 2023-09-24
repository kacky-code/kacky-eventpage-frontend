/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Box,
  IconButton,
} from '@chakra-ui/react';

import { MdOutlineArrowBack } from 'react-icons/md';

// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Register from './Register';
import ResetPasswordConfirmToken from './ResetPasswordConfirmToken';

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login');

  return (
    <Modal
      size={{ base: 'full', md: 'md' }}
      blockScrollOnMount={false}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay backdropFilter='auto' backdropBlur='10px' />
      <ModalContent maxW='416px'>
        <Box w='full' h='800px' px='48px' py='64px'>
          {mode === 'login' ? (
            <Login onClose={onClose} setMode={setMode} />
          ) : null}
          {mode === 'resetPassword' ? (
            <ResetPassword setMode={setMode} />
          ) : null}
          {mode === 'confirmReset' ? (
            <ResetPasswordConfirmToken setMode={setMode} />
          ) : null}
          {mode === 'register' ? <Register setMode={setMode} /> : null}
          {mode !== 'login' && (
            <IconButton
              onClick={() => setMode('login')}
              borderRadius='full'
              top='8px'
              left='12px'
              position='absolute'
              variant='ghost'
              fontSize='xl'
              icon={<MdOutlineArrowBack />}
            />
          )}
          <ModalCloseButton
            onClick={() => setMode('login')}
            boxSize='40px'
            borderRadius='full'
          />
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
