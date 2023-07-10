import React, { useContext, useState } from 'react';
import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  useToast,
  Text,
  VStack, Link,
} from '@chakra-ui/react';
import AuthContext from '../../context/AuthContext';
import { setEventInfo } from '../../api/api';
import EventTable from './EventManagerTable';

const EventManager = () => {
    const { authentication } = useContext(AuthContext);
    const toast = useToast();

    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('');
    const [edition, setEdition] = useState('');
    const [eventStart, setEventStart] = useState('');
    const [eventEnd, setEventEnd] = useState('');
    const [minMapID, setMinMapID] = useState('');
    const [maxMapID, setMaxMapID] = useState('');

    const handleSave = (e) => {
      e.preventDefault();
      let errordesc = "";
      if (Number.isNaN(edition)) {
        errordesc = "Edition must be an Integer!"
      }
      if (Number.isNaN(minMapID) || Number.isNaN(maxMapID)) {
        errordesc = "Map IDs must be an Integer!"
      }
      if (eventStart.length > 16 || eventEnd.length > 16) {
        errordesc = "Date too long. For some reason those fields accept 5 and 6 digit years. #futureproof"
      }
      if (errordesc !== "") {
        toast({
          title: 'Bad Value',
          description: errordesc,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        return;
      }
      if (
        eventName === ""
        || eventType === ""
        || edition === ""
        || eventStart === ""
        || eventEnd === ""
        || minMapID === ""
        || maxMapID === ""
      ) {
        toast({
          title: 'Missing Data',
          description: `All fields in the form are required!`,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        return;
      }
      setEventInfo(authentication.token, {
        "create": {
          "name": eventName,
          "type": eventType,
          "edition": edition,
          "startDate": eventStart,
          "endDate": eventEnd,
          "minID": minMapID,
          "maxID": maxMapID
        }
      }).then(() => {
        toast({
          title: 'Success',
          description: `Event was saved successfully!`,
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: `Event could not be saved! ${err}`,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      });
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
        <VStack spacing={4} width="30%">
          <Flex
            mb={5}
            direction='row'
            justifyItems="start"
            width="full"
          >
            <Button as={Link} href="/kackend">Back</Button>
          </Flex>
          <Flex direction="column">
            <Text fontSize="xl" fontWeight="400" textTransform="uppercase" pb={6}>Event Management</Text>
            <EventTable />
          </Flex>

          <Text fontSize="xl" fontWeight="400" textTransform="uppercase" pt={8}>Add new Event</Text>
          <Center>
            <form>
              <FormControl>
                <FormLabel htmlFor="eventName">Event Name</FormLabel>
                <Input type="text" id="eventName" placeholder="Enter event name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
              </FormControl>

              <Flex mt={6} justify="space-between">
                <FormControl flex="1" marginRight={4}>
                  <FormLabel htmlFor="eventType">Event Type</FormLabel>
                  <Select id="eventType" placeholder="Select event type" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                    <option value="KK">KK</option>
                    <option value="KR">KR</option>
                  </Select>
                </FormControl>

                <FormControl flex="1">
                  <FormLabel htmlFor="edition">Edition</FormLabel>
                  <Input type="number" id="edition" placeholder="Enter edition" value={edition} onChange={(e) => setEdition(e.target.value)} />
                </FormControl>
              </Flex>

              <FormControl mt={6}>
                <FormLabel htmlFor="eventStart">Event Start (CET/CEST)</FormLabel>
                <Input type="datetime-local" id="eventStart" value={eventStart} onChange={(e) => setEventStart(e.target.value)} />
              </FormControl>

              <FormControl mt={6}>
                <FormLabel htmlFor="eventEnd">Event End (CET/CEST)</FormLabel>
                <Input type="datetime-local" id="eventEnd" value={eventEnd} onChange={(e) => setEventEnd(e.target.value)} />
              </FormControl>

              <Flex mt={6} justify="space-between">
                <FormControl flex="1" marginRight={4}>
                  <FormLabel htmlFor="mapsFrom">Maps from</FormLabel>
                  <Input type="number" id="mapsFrom" placeholder="First Map ID" value={minMapID} onChange={(e) => setMinMapID(e.target.value)} />
                </FormControl>

                <FormControl flex="1">
                  <FormLabel htmlFor="mapsTo">Maps to</FormLabel>
                  <Input type="number" id="mapsTo" placeholder="Last Map ID" value={maxMapID} onChange={(e) => setMaxMapID(e.target.value)} />
                </FormControl>
              </Flex>

              <Button mt={6} mb={50} type="submit" onClick={handleSave}>Submit</Button>
            </form>
          </Center>
        </VStack>
      </Center>
    );
  }

export default EventManager;