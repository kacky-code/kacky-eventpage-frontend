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
} from '@chakra-ui/react';
import React from 'react';
import { MdInfoOutline } from 'react-icons/md';

const Profile = () => {
  const text = '';

  return (
    <Center w="100%">
      <VStack spacing={6} align="flex-start" w="container.xl">
        <Text textShadow="glow" letterSpacing="0.1em" fontSize="xl">
          {text}Your Profile
        </Text>
        <HStack spacing={8} w="full">
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
        </HStack>
        <Divider />
        <FormControl maxW="330px">
          <FormLabel>Enter new E-Mail</FormLabel>
          <Input placeholder="New E-Mail" />
          <Button mt={4}>Update E-Mail</Button>
        </FormControl>
        <Divider />
        <FormControl maxW="330px">
          <FormLabel>Enter new Password</FormLabel>
          <Input placeholder="New Password" />{' '}
          <Input placeholder="Confirm new Password" mt={4} />
          <Button mt={4}>Update Password</Button>
        </FormControl>
        <Divider />
        <Button bg="red.400" color="red.900">
          Delete Account
        </Button>
      </VStack>
    </Center>
  );
};

export default Profile;
