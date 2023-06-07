import React, { useState } from 'react';
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormErrorMessage, useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { resetPasswordStep1 } from '../../../api/api';

const ResetPassword = ({ setMode }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
    setEmailError(emailRegex.test(email) ? '' : 'Please enter a valid email address.');
  };

  const validateUsername = () => {
    setUsernameValid(username.length > 0);
    setUsernameError(username.length > 0 ? '' : 'Please enter a username.');
  };

  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailValid || !usernameValid) {
      return;
    }

    resetPasswordStep1(username, email)
      .then(() => {
        setMode('confirmReset');
      })
      .catch((error) => {
        toast({
          title: 'Connection Error',
          description: `Could not connect to API! ${  error}`,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      });
    };

  return (
    <>
      <Text textShadow="glow" letterSpacing="0.1em" fontSize="xl">
        Reset Password
      </Text>
      <VStack spacing={6} w="full" as="form" onSubmit={handleSubmit}>
        <FormControl isInvalid={!usernameValid}>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            onBlur={validateUsername}
          />
          <FormErrorMessage>{usernameError}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!emailValid}>
          <FormLabel>E-Mail</FormLabel>
          <Input
            placeholder="E-Mail"
            value={email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
          />
          <FormErrorMessage>{emailError}</FormErrorMessage>
        </FormControl>
        <Button type="submit" w="full">
          Reset my Password
        </Button>
      </VStack>
    </>
  );
};

ResetPassword.propTypes = {
  setMode: PropTypes.func.isRequired,
};

export default ResetPassword;
