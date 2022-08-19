import React from 'react';
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const Login = ({ setMode }) => {
  return (
    <>
      <Text textShadow="glow" letterSpacing="0.1em" fontSize="xl">
        Login
      </Text>
      <VStack spacing={6} w="full">
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input placeholder="Username" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input placeholder="Password" />
        </FormControl>
      </VStack>

      <VStack spacing={4} w="full">
        <Button w="full">Login</Button>
        <Text
          letterSpacing="0.1em"
          textDecoration="underline"
          color="blue.100"
          fontSize="sm"
          textShadow="glow"
          _hover={{ color: 'blue.200', cursor: 'pointer' }}
          onClick={() => setMode('resetPassword')}
        >
          Forgot your Password?
        </Text>
      </VStack>
      <HStack justify="center" spacing={4} w="full">
        <Text letterSpacing="0.1em" fontSize="sm" textShadow="glow">
          No Account?
        </Text>
        <Text
          letterSpacing="0.1em"
          textDecoration="underline"
          color="blue.100"
          fontSize="sm"
          textShadow="glow"
          _hover={{ color: 'blue.200', cursor: 'pointer' }}
          onClick={() => setMode('register')}
        >
          Register here
        </Text>
      </HStack>
    </>
  );
};

Login.propTypes = {
  setMode: PropTypes.func.isRequired,
};

export default Login;
