import React, { useContext, useState } from 'react';
import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  CircularProgress,
  VStack,
  Text,
  Link,
  Code,
  ListItem,
  List,
  Flex,
} from '@chakra-ui/react';
import AuthContext from '../../context/AuthContext';
import { setMapInfoAdmin } from '../../api/api';

const MapManager = () => {
  const { authentication } = useContext(AuthContext);
  const toast = useToast();

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [overwriteOption, setOverwriteOption] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 1048576) {
      setFile(selectedFile);
    } else {
      setFile(null);
      toast({
        title: 'Invalid File Size',
        description: 'Please select a file smaller than 1MB.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleUpload = async e => {
    e.preventDefault();
    if (!file) {
      toast({
        title: 'No File Selected',
        description: 'Please select a file to upload.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setIsOpen(true);
    try {
      const response = await setMapInfoAdmin(authentication.token, file);
      setResponseMessage(response);
    } catch (err) {
      setResponseMessage(`Map information could not be uploaded: ${err}`);
      setOverwriteOption(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadOverwrite = async e => {
    e.preventDefault();

    setIsLoading(true);
    setIsOpen(true);
    try {
      const response = await setMapInfoAdmin(authentication.token, file, true);
      setResponseMessage(response);
    } catch (err) {
      setResponseMessage(`Map information could not be uploaded: ${err}`);
    } finally {
      setIsLoading(false);
      setOverwriteOption(false);
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setResponseMessage('');
  };

  try {
    if (!JSON.parse(atob(authentication.token.split('.')[1])).isAdmin) {
      return <div>Not authorized</div>;
    }
  } catch (e) {
    return <div>Not authorized</div>;
  }

  return (
    <Center>
      <VStack>
        <Flex direction="row" justifyItems="start" width="full">
          <Button as={Link} href="/kackend">
            Back
          </Button>
        </Flex>
        <Flex direction="column" alignItems="start">
          <Text
            fontSize="2xl"
            fontWeight="400"
            textDecoration="underline"
            textUnderlineOffset="0.2em"
          >
            What this? How it do be working?
          </Text>
          <div
            style={{
              textAlign: 'left',
              lineHeight: '2',
              fontSize: 'larger',
              textTransform: 'none',
            }}
          >
            With this you can bulk-update maps by providing a CSV file with all
            the information. <br />
            <Link href="https://static.kacky.gg/map_update_template.csv">
              Get the template CSV here:
              https://static.kacky.gg/map_update_template.csv
            </Link>
            <br />
            <List>
              <ListItem>
                <Code>prefix</Code> is the name of the maps for this edition,
                without the number (e.g.{' '}
                <Code>$o$i$aa0Kack$05ay Re$09alo$6a0ad$aa0ed $4f0#</Code>).
              </ListItem>
              <ListItem>
                <Code>event</Code> is created from the event type
                (&quot;KK&quot; or &quot;KR&quot;) and the edition number (e.g.{' '}
                <Code>KR4</Code>)
              </ListItem>
              <ListItem>
                <Code>kacky_id</Code> - number of the map (e.g. <Code>-64</Code>
                , the most fun spiderman map.)
              </ListItem>
              <ListItem>
                <Code>author</Code> - TM-Login author of the map (e.g.{' '}
                <Code>sightorld</Code>)
              </ListItem>
              <ListItem>
                <Code>at</Code> is the author time in ms. (seconds * 1000) (e.g.{' '}
                <Code>14540</Code> for 14.54s)
              </ListItem>
              <ListItem>
                <Code>difficulty</Code> rated difficulty from 1 to 100. This
                only is set once rating squad did their work.
              </ListItem>
              <ListItem>
                <Code>tm_uid</Code> - UID of the map. Somewhere in GBX
              </ListItem>
              <ListItem>
                <Code>tmx_id</Code> is the ID of the map once uploaded to TMX.
              </ListItem>
            </List>
            Note: Only <Code>difficulty</Code>, <Code>tm_uid</Code> and{' '}
            <Code>tmx_id</Code> are optional.
            <br />
            Important: If you dont fill an optional field, at the moment that
            overwrites the existing information! I&apos;ll patch it at some
            point.
          </div>
        </Flex>
        <form /* style={{ width: '30%' }} */ encType="multipart/form-data">
          <FormControl mt={6}>
            <FormLabel htmlFor="file">Map File (CSV, max 1MB)</FormLabel>
            <Input
              type="file"
              name="file"
              id="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </FormControl>

          <Button mt={6} type="submit" onClick={handleUpload}>
            Upload
          </Button>

          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={undefined}
            onClose={onClose}
            isCentered
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  {isLoading ? 'Uploading...' : 'Upload Result'}
                </AlertDialogHeader>

                <AlertDialogBody>
                  {isLoading ? (
                    <Center>
                      <CircularProgress
                        isIndeterminate
                        color="blue.500"
                        size="48px"
                        thickness="4px"
                      />
                    </Center>
                  ) : (
                    <p>{responseMessage}</p>
                  )}
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onClose}>Close</Button>
                  {overwriteOption ? (
                    <Button
                      variant="danger"
                      onClick={handleUploadOverwrite}
                      ml={3}
                    >
                      Overwrite
                    </Button>
                  ) : null}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </form>
      </VStack>
    </Center>
  );
};

export default MapManager;
