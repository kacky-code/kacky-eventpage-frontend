import React, { useContext } from 'react';
import { Center, Flex, FormControl, FormLabel, Input, Select, Button, Box } from '@chakra-ui/react';
import AuthContext from '../../context/AuthContext';

const EventManager = () => {
  const { authentication } = useContext(AuthContext);

  const handleSave = () => {
    // Perform API call or any other action here
    console.log("Save button clicked");
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
      <form style={{ width: '30%' }}>
        <FormControl mt={6}>
          <FormLabel htmlFor="eventName">Event Name</FormLabel>
          <Input type="text" id="eventName" placeholder="Enter event name" />
        </FormControl>

        <Flex mt={6} justify="space-between">
          <FormControl flex="1" marginRight={4}>
            <FormLabel htmlFor="eventType">Event Type</FormLabel>
            <Select id="eventType" placeholder="Select event type">
              <option value="KK">KK</option>
              <option value="KR">KR</option>
            </Select>
          </FormControl>

          <FormControl flex="1">
            <FormLabel htmlFor="edition">Edition</FormLabel>
            <Input type="number" id="edition" placeholder="Enter edition" />
          </FormControl>
        </Flex>

        <FormControl mt={6}>
          <FormLabel htmlFor="eventStart">Event Start</FormLabel>
          <Input type="datetime-local" id="eventStart" />
        </FormControl>

        <FormControl mt={6}>
          <FormLabel htmlFor="eventEnd">Event End</FormLabel>
          <Input type="datetime-local" id="eventEnd" />
        </FormControl>

        <Flex mt={6} justify="space-between">
          <FormControl flex="1" marginRight={4}>
            <FormLabel htmlFor="mapsFrom">Maps from</FormLabel>
            <Input type="number" id="mapsFrom" placeholder="Enter maps from" />
          </FormControl>

          <FormControl flex="1">
            <FormLabel htmlFor="mapsTo">Maps to</FormLabel>
            <Input type="number" id="mapsTo" placeholder="Enter maps to" />
          </FormControl>
        </Flex>

        <Button mt={6} type="submit" onClick={handleSave}>Submit</Button>
      </form>
    </Center>
  );
}

export default EventManager;