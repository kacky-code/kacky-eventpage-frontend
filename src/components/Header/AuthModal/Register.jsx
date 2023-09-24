import React, { useRef, useState } from 'react';
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Divider,
  Flex,
  FormHelperText,
  FormErrorMessage,
  HStack,
  useToast,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../../api/api';

const Register = ({ setMode }) => {
  const toast = useToast();
  const [isRegistered, setIsRegistered] = useState(false);

  const [serverError, setServerError] = useState({
    isError: false,
    message: '',
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');

  const mutation = useMutation(
    data => registerUser(data.username, data.password, data.mailadress),
    {
      onSuccess: () => {
        setIsRegistered(true);
        toast({
          title: 'Registration',
          description: 'Registration successful!',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      },
      onError: () => {
        setServerError({
          isError: true,
          message: 'Username or E-Mail already taken',
        });
      },
    }
  );

  const onSubmit = data => mutation.mutate(data);

  return (
    <Flex
      direction='column'
      w='full'
      h='full'
      align='center'
      justify='space-around'
      as='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      {isRegistered ? (
        <HStack justify='center' spacing={4} w='full'>
          <Text letterSpacing='0.1em' fontSize='sm' textShadow='glow'>
            Successfully registered!
          </Text>
          <Text
            letterSpacing='0.1em'
            textDecoration='underline'
            color='blue.500'
            _dark={{ color: 'blue.100' }}
            fontSize='sm'
            textShadow='glow'
            _hover={{ color: 'blue.200', cursor: 'pointer' }}
            onClick={() => setMode('login')}
          >
            Login now
          </Text>
        </HStack>
      ) : (
        <>
          <Text textShadow='glow' letterSpacing='0.1em' fontSize='xl'>
            Register
          </Text>
          <VStack spacing={6} w='full'>
            <FormControl isInvalid={errors.mailadress}>
              <FormLabel>E-Mail</FormLabel>
              <Input
                {...register('mailadress', {
                  required: 'E-Mail is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                  maxLength: {
                    value: 80,
                    message: 'Really? Sleeping on your Keyboard?',
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Not a valid mail adress',
                  },
                })}
                type='email'
                id='mailadress'
                placeholder='E-Mail'
              />
              {!errors.mailadress ? (
                <FormHelperText>Enter your E-Mail here</FormHelperText>
              ) : (
                <FormErrorMessage>
                  {errors.mailadress ? errors.mailadress.message : null}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 1,
                    message: 'Minimum length should be 1',
                  },
                  maxLength: {
                    value: 80,
                    message: 'Really? Sleeping on your Keyboard?',
                  },
                  pattern: {
                    value: /[a-zA-Z0-9]*/,
                    message: 'Only letters and numbers allowed',
                  },
                })}
                id='username'
                placeholder='Username'
              />
              {!errors.username ? (
                <FormHelperText>Enter your username here</FormHelperText>
              ) : (
                <FormErrorMessage>
                  {errors.username ? errors.username.message : null}
                </FormErrorMessage>
              )}
            </FormControl>
            <Divider />
            <FormControl isInvalid={errors.password}>
              <FormLabel>Your Password</FormLabel>
              <Input
                {...register('password', {
                  required: 'You must specify a password',
                  minLength: {
                    value: 8,
                    message: 'Minimum length should be 8',
                  },
                  maxLength: {
                    value: 80,
                    message: 'Really? Sleeping on your Keyboard?',
                  },
                })}
                id='password'
                type='password'
                placeholder='Password'
              />
              {!errors.password ? (
                <FormHelperText>Enter your password here</FormHelperText>
              ) : (
                <FormErrorMessage>
                  {errors.password ? errors.password.message : null}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.passwordConfirm}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                {...register('passwordConfirm', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Minimum length should be 8',
                  },
                  maxLength: {
                    value: 80,
                    message: 'Really? Sleeping on your Keyboard?',
                  },
                  validate: value =>
                    value === password.current || 'The passwords do not match',
                })}
                id='passwordConfirm'
                type='password'
                placeholder='Password'
              />
              {!errors.passwordConfirm ? (
                <FormHelperText>Confirm your password here</FormHelperText>
              ) : (
                <FormErrorMessage>
                  {errors.passwordConfirm
                    ? errors.passwordConfirm.message
                    : null}
                </FormErrorMessage>
              )}
            </FormControl>
          </VStack>
          <VStack spacing={4} w='full'>
            <Text
              h='21px'
              color='red.500'
              _dark={{ color: 'red.300' }}
              fontWeight='normal'
              fontSize='sm'
              letterSpacing='0.1em'
            >
              {serverError.isError ? serverError.message : null}
            </Text>
            <Button w='full' type='submit'>
              Register
            </Button>
          </VStack>
        </>
      )}
    </Flex>
  );
};

Register.propTypes = {
  setMode: PropTypes.func.isRequired,
};

export default Register;
