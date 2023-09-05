import React, { useState } from 'react';
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  FormErrorMessage,
  useToast,
  Flex,
  Box,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { resetPasswordStep2 } from '../../../api/api';

const ResetPasswordConfirmToken = ({ setMode }) => {
  const toast = useToast();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tokenValid, setTokenValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [errorToken, setErrorToken] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const handleTokenChange = event => {
    setToken(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value);
  };

  const validateToken = () => {
    // Perform validation logic for token here
    const tokenRegex = /^[a-z0-9]{6}$/; // Regular expression to match 6 digits
    setTokenValid(tokenRegex.test(token));
    setErrorToken(
      token.length !== 6 || !tokenRegex.test(token) ? 'Invalid Token' : ''
    );
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setErrorPassword('Minimum length should be 8');
      setPasswordValid(false);
    } else if (password.length > 80) {
      setErrorPassword('Really? Sleeping on your Keyboard?');
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
      setErrorPassword('');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    validateToken();
    validatePassword();

    if (!tokenValid) {
      setErrorToken('Please enter a valid token.');
      return;
    }

    if (!passwordValid) {
      return;
    }

    resetPasswordStep2(token, password)
      .then(() => {
        setMode('confirmReset');
        setMode('login');
        toast({
          title: 'Password reset',
          description: 'Password reset successful!',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      })
      .catch(error => {
        toast({
          title: 'Connection Error',
          description: `Could not connect to API! ${error}`,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      direction="column"
      w="full"
      h="75%"
      align="center"
      justify="space-around"
    >
      <Text textShadow="glow" letterSpacing="0.1em" fontSize="xl">
        Reset Password - Confirm Token
      </Text>
      <VStack spacing={6} w="full" as="form" onSubmit={handleSubmit}>
        <FormControl isInvalid={!tokenValid}>
          <FormLabel>Token (Check E-Mails)</FormLabel>
          <Input
            placeholder="6 characters"
            value={token}
            onChange={handleTokenChange}
            onBlur={validateToken}
          />
          <FormErrorMessage>{errorToken}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!passwordValid}>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            placeholder=""
            value={password}
            onChange={handlePasswordChange}
            onBlur={validatePassword}
          />
          <FormErrorMessage>{errorPassword}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={password !== confirmPassword}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder=""
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {password !== confirmPassword && (
            <FormErrorMessage>Passwords do not match.</FormErrorMessage>
          )}
        </FormControl>
        <Box height={5} />
        <Button type="submit" w="full">
          Submit
        </Button>
      </VStack>
    </Flex>
  );
};

ResetPasswordConfirmToken.propTypes = {
  setMode: PropTypes.func.isRequired,
};

export default ResetPasswordConfirmToken;
