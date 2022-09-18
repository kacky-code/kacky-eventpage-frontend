import React from 'react';
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars, arrow-body-style
const ResetPassword = ({ setMode }) => {
  return (
    <>
      <Text textShadow="glow" letterSpacing="0.1em" fontSize="xl">
        Reset Password
      </Text>
      <VStack spacing={6} w="full">
        <FormControl>
          <FormLabel>E-Mail</FormLabel>
          <Input placeholder="E-Mail" />
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input placeholder="Username" />
        </FormControl>
      </VStack>

      <Button w="full">Reset my Password</Button>
    </>
  );
};

ResetPassword.propTypes = {
  setMode: PropTypes.func.isRequired,
};

export default ResetPassword;
