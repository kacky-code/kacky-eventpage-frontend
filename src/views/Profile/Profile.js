import {
  Center,
  HStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  IconButton,
  Divider,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { MdInfoOutline } from 'react-icons/md';

// eslint-disable-next-line arrow-body-style
const Profile = () => {
  return (
    <Center px={8} w="100%">
      <VStack spacing={6} align="flex-start" w="container.xl">
        <Text textShadow="glow" letterSpacing="0.1em" fontSize="xl">
          Your Profile
        </Text>
        <Stack
          direction={{ base: 'column', xl: 'row' }}
          spacing={8}
          w={{ base: 'full', md: '330px', xl: 'full' }}
        >
          <FormControl>
            <HStack spacing={4} mb={2}>
              <FormLabel m="0">TMNF Login</FormLabel>
              <IconButton
                borderRadius="full"
                size="sm"
                fontSize="1rem"
                icon={<MdInfoOutline />}
              />
            </HStack>
            <HStack spacing={4}>
              <Input placeholder="Enter TMNF Login" />
              <Button>Save</Button>
            </HStack>
          </FormControl>
          <FormControl>
            <HStack spacing={4} mb={2}>
              <FormLabel m="0">TM2020 Login</FormLabel>
              <IconButton
                borderRadius="full"
                size="sm"
                fontSize="1rem"
                icon={<MdInfoOutline />}
              />
            </HStack>
            <HStack spacing={4}>
              <Input placeholder="Enter TM2020 Login" />
              <Button>Save</Button>
            </HStack>
          </FormControl>
          <FormControl>
            <HStack spacing={4} mb={2}>
              <FormLabel m="0">Discord ID</FormLabel>
              <IconButton
                borderRadius="full"
                size="sm"
                fontSize="1rem"
                icon={<MdInfoOutline />}
              />
            </HStack>
            <HStack spacing={4}>
              <Input placeholder="Enter Discord ID (Username#0000)" />
              <Button>Save</Button>
            </HStack>
          </FormControl>
        </Stack>
        <Divider />
        <FormControl maxW={{ base: 'full', md: '330px' }} align="left">
          <FormLabel>Enter new E-Mail</FormLabel>
          <Input placeholder="New E-Mail" />
          <Button mt={4}>Update E-Mail</Button>
        </FormControl>
        <Divider />
        <FormControl maxW={{ base: 'full', md: '330px' }} align="left">
          <FormLabel>Enter new Password</FormLabel>
          <Input placeholder="New Password" />{' '}
          <Input placeholder="Confirm new Password" mt={4} />
          <Button mt={4}>Update Password</Button>
        </FormControl>
        <Divider />
        <Button variant="danger">Delete Account</Button>
      </VStack>
    </Center>
  );
};

export default Profile;
