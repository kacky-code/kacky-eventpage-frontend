import React, { useContext } from 'react';
import { Box, Center, VStack } from '@chakra-ui/react';

import { MdOutlineModeEdit } from 'react-icons/md';
import AuthContext from '../../context/AuthContext';
import ActionCard from './ActionCard';

const AdminIndex = () => {
  const { authentication } = useContext(AuthContext);

  try {
    if (!JSON.parse(atob(authentication.token.split('.')[1])).isAdmin) {
      return <Box>Not authorized</Box>;
    }
  } catch (e) {
    return <Box>Not authorized</Box>;
  }

  return (
    <Center>
      <VStack spacing={4}>
        <ActionCard
          icon={MdOutlineModeEdit}
          title='Events'
          description='Do Event stuff.'
          linkTarget='events'
        />
        <ActionCard
          icon={MdOutlineModeEdit}
          title='Worldrecords'
          description='Manage Worldrecords. Removal of rouge entries.'
          linkTarget='wrs'
        />
        <ActionCard
          icon={MdOutlineModeEdit}
          title='Maps'
          description='Update Map Information'
          linkTarget='maps'
        />
      </VStack>
    </Center>
  );
};

export default AdminIndex;
