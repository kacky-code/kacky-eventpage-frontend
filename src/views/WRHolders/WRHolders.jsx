import React from 'react';
import {
  Button,
  Center,
  Heading,
  useBoolean,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import WRTable from '../Leaderboard/WRTable';

const WRHolders = () => {
  const { colorMode } = useColorMode();
  const [krView, setKrView] = useBoolean();

  return (
    <Center
      px={{ base: 4, md: 8 }}
      mt={{ base: -16, md: -20 }}
      mb={{ base: 24, md: 8 }}
      w='full'
    >
      <VStack overflow='hidden' spacing={4}>
        <Heading mt={{ base: 14, md: 10 }} mb={{ base: 0, md: 4 }}>List of WR Holders</Heading>

        <Center mb={{ base: 0, md: 4 }}>
          <Button
            borderRadius='6px 0 0 6px'
            onClick={setKrView.toggle}
            borderColor={
              krView
                ? colorMode === 'dark'
                  ? 'white'
                  : 'black'
                : 'transparent'
            }
            borderWidth='1px'
            pointerEvents={krView ? 'none' : 'auto'}
            shadow={krView ? 'glow' : 'none'}
            textShadow={krView ? 'glow' : 'none'}
            fontSize={{ base: 'm', md: 'xl'}}
            letterSpacing='0.1em'
          >
            Kackiest Kacky
          </Button>
          <Button
            borderRadius='0 6px 6px 0'
            onClick={setKrView.toggle}
            borderColor={
              !krView
                ? colorMode === 'dark'
                  ? 'white'
                  : 'black'
                : 'transparent'
            }
            borderWidth='1px'
            pointerEvents={!krView ? 'none' : 'auto'}
            shadow={!krView ? 'glow' : 'none'}
            textShadow={!krView ? 'glow' : 'none'}
            fontSize={{ base: 'm', md: 'xl'}}
            letterSpacing='0.1em'
          >
            Kacky Reloaded
          </Button>
        </Center>
        {krView ? (
          <VStack mr={5}>
            <WRTable eventtype='kk' />
          </VStack>
        ) : (
          <VStack justifyItems='start' height='full'>
            <WRTable eventtype='kr' />
          </VStack>
        )}
      </VStack>
    </Center>
  );
};

export default WRHolders;
