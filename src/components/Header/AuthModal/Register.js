import React from 'react';
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Divider,
  FormHelperText,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars, arrow-body-style
const Register = ({ setMode }) => {
  return (
    <>
      <Text textShadow="glow" letterSpacing="0.1em" fontSize="xl">
        Register
      </Text>
      <VStack spacing={6} w="full">
        <FormControl>
          <FormLabel>Your E-Mail</FormLabel>
          <Input placeholder="E-Mail" />
          <FormHelperText>
            We store your e-mail adress in a hash, that means we don&apos;t
            actually know your adress. No spam for you.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Your Username</FormLabel>
          <Input placeholder="Password" />
          <FormHelperText>
            This does not have to be your ingame name.
          </FormHelperText>
        </FormControl>
        <Divider />
        <FormControl>
          <FormLabel>Your Password</FormLabel>
          <Input placeholder="Password" />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input placeholder="Password" />
        </FormControl>
      </VStack>

      <Button w="full">Register</Button>
    </>
  );
};

Register.propTypes = {
  setMode: PropTypes.func.isRequired,
};

export default Register;
