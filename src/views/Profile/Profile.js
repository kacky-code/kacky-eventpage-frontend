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
  // eslint-disable-next-line no-unused-vars
  Divider,
  Stack,
  useToast,
} from '@chakra-ui/react';

import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState, useContext, useEffect } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { postProfileData, getProfileData } from '../../api/api';

import AuthContext from '../../context/AuthContext';

const Profile = () => {
  const toast = useToast();

  const [tmnfLogin, setTmnfLogin] = useState('');
  const [tm2020Login, setTm2020Login] = useState('');
  const [discordLogin, setDiscordLogin] = useState('');

  const { authentication } = useContext(AuthContext);
  const { data: profileData, isSuccess } = useQuery(
    ['profile', authentication.token],
    () => getProfileData(authentication.token)
  );

  useEffect(() => {
    if (isSuccess) {
      setTmnfLogin(profileData.tmnf);
      setTm2020Login(profileData.tm20);
      setDiscordLogin(profileData.discord);
    }
  }, [profileData, isSuccess]);

  const mutation = useMutation(data => postProfileData(data), {
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Login was successfully updated!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An error occurred!',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const onSubmit = data => mutation.mutate(data);

  if (!authentication.isLoggedIn)
    return <Text> Login to see your Profile!</Text>;

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
              <Input
                minLength={3}
                maxLength={80}
                defaultValue={tmnfLogin}
                onChange={e => setTmnfLogin(e.target.value)}
                placeholder="Enter TMNF Login"
              />
              <Button
                onClick={() =>
                  onSubmit({ tmnf: tmnfLogin, token: authentication.token })
                }
              >
                Save
              </Button>
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
              <Input
                minLength={3}
                maxLength={80}
                defaultValue={tm2020Login}
                onChange={e => setTm2020Login(e.target.value)}
                placeholder="Enter TM2020 Login"
              />
              <Button
                onClick={() =>
                  onSubmit({ tm20: tm2020Login, token: authentication.token })
                }
              >
                Save
              </Button>
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
              <Input
                minLength={3}
                maxLength={80}
                defaultValue={discordLogin}
                onChange={e => setDiscordLogin(e.target.value)}
                placeholder="Enter Discord ID (Username#0000)"
              />
              <Button
                onClick={() =>
                  onSubmit({
                    discord: discordLogin,
                    token: authentication.token,
                  })
                }
              >
                Save
              </Button>
            </HStack>
          </FormControl>
        </Stack>
        {/* <Divider />
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
        <Button variant="danger">Delete Account</Button> */}
      </VStack>
    </Center>
  );
};

export default Profile;
