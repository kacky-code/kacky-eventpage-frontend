import React, { useState, useContext } from 'react';
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  useToast,
  Flex,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';

import Cookies from 'universal-cookie';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { login } from '../../../api/api';

import AuthContext from '../../../context/AuthContext';

const Login = ({ setMode, onClose }) => {
  const toast = useToast();

  const { setAuthentication } = useContext(AuthContext);

  const [serverError, setServerError] = useState({
    isError: false,
    message: '',
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(data => login(data.username, data.password), {
    onSuccess: response => {
      const cookies = new Cookies();
      cookies.set('token', response.access_token, { path: '/' });

      setAuthentication({
        isLoggedIn: true,
        token: response.access_token,
      });

      toast({
        title: 'Login',
        description: 'You were successfully logged in!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      onClose();
    },
    onError: () => {
      setServerError({ isError: true, message: 'Wrong username or password' });
    },
  });

  const onSubmit = data => mutation.mutate(data);

  return (
    <Flex
      direction="column"
      w="full"
      h="full"
      align="center"
      justify="space-around"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Text textShadow="glow" letterSpacing="0.1em" fontSize="xl">
        Login
      </Text>
      <VStack spacing={6} w="full">
        <FormControl isInvalid={errors.username}>
          <FormLabel>Username</FormLabel>
          <Input
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 1, message: 'Minimum length should be 1' },
              maxLength: {
                value: 80,
                message: 'Really? Sleeping on your Keyboard?',
              },
              pattern: {
                value: /[a-zA-Z0-9]*/,
                message: 'Only letters and numbers allowed',
              },
            })}
            id="username"
            placeholder="Username"
          />
          {!errors.username ? (
            <FormHelperText>Enter your username here</FormHelperText>
          ) : (
            <FormErrorMessage>
              {errors.username ? errors.username.message : null}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Minimum length should be 8' },
              maxLength: {
                value: 80,
                message: 'Really? Sleeping on your Keyboard?',
              },
            })}
            id="password"
            type="password"
            placeholder="Password"
          />
          {!errors.password ? (
            <FormHelperText>Enter your password here</FormHelperText>
          ) : (
            <FormErrorMessage>
              {errors.password ? errors.password.message : null}
            </FormErrorMessage>
          )}
        </FormControl>
      </VStack>

      <VStack spacing={4} w="full">
        <Text
          h="21px"
          color="red.500"
          _dark={{ color: 'red.300' }}
          fontWeight="normal"
          fontSize="sm"
          letterSpacing="0.1em"
        >
          {serverError.isError ? serverError.message : null}
        </Text>
        <Button type="submit" w="full">
          Login
        </Button>
        {/* <Text
          letterSpacing="0.1em"
          textDecoration="underline"
          color="blue.500"
          _dark={{ color: 'blue.100' }}
          fontSize="sm"
          textShadow="glow"
          _hover={{ color: 'blue.200', cursor: 'pointer' }}
          onClick={() => setMode('resetPassword')}
        >
          Forgot your Password?
        </Text> */}
      </VStack>
      <HStack justify="center" spacing={4} w="full">
        <Text letterSpacing="0.1em" fontSize="sm" textShadow="glow">
          No Account?
        </Text>
        <Text
          letterSpacing="0.1em"
          textDecoration="underline"
          color="blue.500"
          _dark={{ color: 'blue.100' }}
          fontSize="sm"
          textShadow="glow"
          _hover={{ color: 'blue.200', cursor: 'pointer' }}
          onClick={() => setMode('register')}
        >
          Register here
        </Text>
      </HStack>
    </Flex>
  );
};

Login.propTypes = {
  setMode: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Login;
