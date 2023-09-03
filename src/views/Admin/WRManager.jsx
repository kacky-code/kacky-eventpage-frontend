// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  HStack,
  Center,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  VStack,
  Box,
  useToast,
  Flex,
  Link,
} from '@chakra-ui/react';
import MapDetailCell from '../HuntingScheduleTableCells/MapDetailCell';
import { getMapInfo, setMapInfo } from '../../api/api';
import AuthContext from '../../context/AuthContext';

const WRManager = () => {
  const { authentication } = useContext(AuthContext);
  const toast = useToast();

  const [mapData, setMapData] = useState(undefined);
  const [kackyId, setKackyId] = useState('');
  const [eventType, setEventType] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleFindClick = e => {
    e.preventDefault();
    getMapInfo(eventType, kackyId).then(data =>
      setMapData({
        number: data.kacky_id.toString(),
        author: data.author,
        wrScore: data.wr_score,
        wrHolder: data.wr_holder,
        // dead data from here on, but required for MapDetailCell to work
        difficulty: 0,
        rating: 0,
        finished: false,
        personalBest: 0,
        kackyRank: 0,
        clip: '',
      })
    );
  };

  const resetHandler = () => {
    setMapInfo(authentication.token, eventType, kackyId, { reset: '' })
      .then(() => {
        toast({
          title: 'Success',
          description: `WR for map was reset successfully!`,
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
    onClose();
  };

  try {
    if (!JSON.parse(atob(authentication.token.split('.')[1])).isAdmin) {
      return <Box>Not authorized</Box>;
    }
  } catch (e) {
    return <Box>Not authorized</Box>;
  }

  return (
    <Center>
      <VStack w="30%">
        <Flex mb={5} direction="row" justifyItems="start" width="full">
          <Button as={Link} href="/kackend">
            Back
          </Button>
        </Flex>
        <Center>
          <form>
            <VStack mb={5}>
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel htmlFor="kackyId">Kacky ID</FormLabel>
                  <Input
                    type="number"
                    id="kackyId"
                    placeholder="Enter Kacky ID"
                    value={kackyId}
                    onChange={e => setKackyId(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="eventType">Event Type</FormLabel>
                  <Select
                    id="eventType"
                    placeholder="Select event type"
                    value={eventType}
                    onChange={e => setEventType(e.target.value)}
                  >
                    <option value="kk">KK</option>
                    <option value="kr">KR</option>
                  </Select>
                </FormControl>
              </HStack>
              <Button type="submit" onClick={handleFindClick}>
                Find
              </Button>
            </VStack>
          </form>
        </Center>
        {mapData === undefined ? null : (
          <>
            <Center mt={10}>
              <MapDetailCell
                mode="minimal"
                data={mapData}
                edition={1}
                eventtype={eventType}
              />
            </Center>
            <Center mt={10}>
              <Button variant="danger" onClick={onOpen}>
                Reset WR
              </Button>
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Reset Worldrecord?
                    </AlertDialogHeader>

                    <AlertDialogBody textTransform="none">
                      You are about to reset the WR on {mapData.number} by&nbsp;
                      {mapData.wrHolder} ({mapData.wrScore / 1000}s).
                      <br />
                      Only do this once it is deleted from Kacky
                      Records/TMX/Nadeo!
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button variant="danger" onClick={resetHandler} ml={3}>
                        Yeet it!
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Center>
          </>
        )}
      </VStack>
    </Center>
  );
};

export default WRManager;
