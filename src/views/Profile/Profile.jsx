import {
  Center,
  HStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Divider,
  Stack,
  useToast,
  FormErrorMessage,
  Box,
  Link,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialog,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';

import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { MdInfoOutline } from 'react-icons/md';
import Cookies from 'universal-cookie';
import {
  postProfileData,
  getProfileData,
  deleteAccount,
  logoutServer,
} from '../../api/api';

import AuthContext from '../../context/AuthContext';

const Profile = () => {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [tmnfLogin, setTmnfLogin] = useState('');
  const [tm2020Login, setTm2020Login] = useState('');
  const [discordLogin, setDiscordLogin] = useState('');

  const [newEmail, setNewEmail] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [newConfirmPwd, setNewConfirmPwd] = useState('');

  const [emailError, setEmailError] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [pwdError, setPwdError] = useState('');
  const [pwdValid, setPwdValid] = useState(true);

  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const { authentication } = useContext(AuthContext);
  const { data: profileData, isSuccess } = useQuery(
    ['profile', authentication.token],
    () => getProfileData(authentication.token),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const validateEmail = checkEmail => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(checkEmail));
    setEmailError(
      emailRegex.test(checkEmail)
        ? setNewEmail(checkEmail)
        : 'Please enter a valid email address.'
    );
  };

  const validatePasswords = () => {
    const equal = newPwd === newConfirmPwd;
    const len = newPwd.length >= 8 && newPwd.length <= 80;
    setPwdValid(equal && len);
    if (!len) {
      setPwdError('Passwords must be between 8 and 80 characters long!');
    } else if (!equal) {
      setPwdError('Passwords are not the same!');
    } else {
      setPwdError('');
    }
  };

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

  const accDeleteMutation = useMutation(
    () => deleteAccount(authentication.token),
    {
      onSuccess: () => {
        // if it fails, it fails. not really important
        logoutServer(authentication.token).catch(() => {});
        const cookies = new Cookies();
        cookies.remove('token', { path: '/' });
        cookies.remove('expires', { path: '/' });
        toast({
          title: 'Success',
          description: 'Account was deleted!',
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
    }
  );

  const onSubmit = data => mutation.mutate(data);
  const handleDelete = () => {
    accDeleteMutation.mutate();
    setTimeout(() => {
      setIsRedirecting(true);
    }, 5000);
  };

  if (isRedirecting) {
    navigate('/');
  }

  if (!authentication.isLoggedIn)
    return <Text>Login to see your Profile!</Text>;

  // Ugly but I dont know better
  let admin = false;
  try {
    if (JSON.parse(atob(authentication.token.split('.')[1])).isAdmin) {
      admin = true;
    }
  } catch {
    admin = false;
  }

  return (
    <Center px={8} w='100%'>
      <Flex
        gap={6}
        direction={{ base: 'column' }}
        align='center'
        w='container.xl'
      >
        {admin ? (
          <Button as={Link} href='/kackend'>
            Admin Backend
          </Button>
        ) : null}
        <Text textShadow='glow' letterSpacing='0.1em' fontSize='xl'>
          Your Profile
        </Text>
        <Stack
          direction={{ base: 'column', xl: 'row' }}
          spacing={8}
          w={{ base: 'full', md: '330px', xl: 'full' }}
        >
          <FormControl>
            <HStack spacing={4} mb={2}>
              <FormLabel m='0'>TMNF Login</FormLabel>
              {/* <IconButton
                borderRadius="full"
                size="sm"
                fontSize="1rem"
                icon={<MdInfoOutline />}
              /> */}
            </HStack>
            <HStack spacing={4}>
              <Input
                minLength={3}
                maxLength={80}
                defaultValue={tmnfLogin}
                onChange={e => setTmnfLogin(e.target.value)}
                placeholder='Enter TMNF Login'
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
              <FormLabel m='0'>TM2020 Login</FormLabel>
              {/* <IconButton
                borderRadius="full"
                size="sm"
                fontSize="1rem"
                icon={<MdInfoOutline />}
              /> */}
            </HStack>
            <HStack spacing={4}>
              <Input
                minLength={3}
                maxLength={80}
                defaultValue={tm2020Login}
                onChange={e => setTm2020Login(e.target.value)}
                placeholder='Enter TM2020 Login'
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
              <FormLabel m='0'>Discord ID</FormLabel>
              {/* <IconButton
                borderRadius="full"
                size="sm"
                fontSize="1rem"
                icon={<MdInfoOutline />}
              /> */}
            </HStack>
            <HStack spacing={4}>
              <Input
                minLength={3}
                maxLength={80}
                defaultValue={discordLogin}
                onChange={e => setDiscordLogin(e.target.value)}
                placeholder='Enter Discord ID (Username#0000)'
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
        <Divider />
        <FormControl
          maxW={{ base: 'full', md: '330px' }}
          align='left'
          isInvalid={!emailValid}
        >
          <FormLabel>Enter new E-Mail</FormLabel>
          <Input
            maxLength={80}
            defaultValue=''
            onBlur={e => validateEmail(e.target.value)}
            placeholder='New E-Mail'
          />
          <FormErrorMessage>{emailError}</FormErrorMessage>
          <Button
            mt={4}
            onClick={() => {
              validateEmail();
              if (emailValid && newEmail.length !== 0) {
                onSubmit(() => ({
                  mail: newEmail,
                  token: authentication.token,
                }));
              }
            }}
          >
            Update E-Mail
          </Button>
        </FormControl>
        <Divider />
        <FormControl
          maxW={{ base: 'full', md: '330px' }}
          align='left'
          isInvalid={!pwdValid}
        >
          <FormLabel>Enter new Password</FormLabel>
          <Input
            id='password'
            type='password'
            minLength={8}
            maxLength={80}
            onChange={e => setNewPwd(e.target.value)}
            onBlur={validatePasswords}
            placeholder='New Password'
          />{' '}
          <Input
            id='confirmPassword'
            type='password'
            minLength={8}
            maxLength={80}
            defaultValue=''
            onChange={e => setNewConfirmPwd(e.target.value)}
            onBlur={validatePasswords}
            placeholder='Confirm new Password'
            mt={4}
          />
          <FormErrorMessage>{pwdError}</FormErrorMessage>
          <Button
            mt={4}
            onClick={() => {
              validatePasswords();
              if (pwdValid && newPwd.length !== 0 && newEmail.length !== 0) {
                onSubmit(() => ({
                  pwd: newPwd,
                  token: authentication.token,
                }));
              }
            }}
          >
            Update Password
          </Button>
        </FormControl>
        <Box paddingTop='50px' height='full' width='full'>
          <Divider />
        </Box>
        <HStack>
          <Button variant='danger' onClick={onOpen}>
            Delete Account
          </Button>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Delete Account?
                </AlertDialogHeader>

                <AlertDialogBody textTransform='none'>
                  You are about to delete your Account! Are you sure?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button variant='danger' onClick={handleDelete} ml={3}>
                    Yeet it!
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </HStack>
      </Flex>
    </Center>
  );
};

export default Profile;
