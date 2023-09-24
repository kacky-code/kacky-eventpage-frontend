import React, { useState } from 'react';
import { Flex, Icon, Text, VStack } from '@chakra-ui/react';

import {
  // MdExpandLess,
  MdExpandMore,
} from 'react-icons/md';

// eslint-disable-next-line no-unused-vars,react/prop-types
const ExpandBox = ({ content, title }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <VStack w='full' borderRadius={16} border={1} bg='gray.700' mt={5}>
      <Flex
        direction='row'
        justifyContent='space-between'
        w='full'
        bg='gray.900'
        border={1}
        borderRadius={16}
        onClick={() => setCollapsed(!collapsed)}
      >
        <Text ml={5}>{title}</Text>
        <Icon boxSize='20px' alignSelf='center' as={MdExpandMore} mr={5} />
      </Flex>
      <Flex w='full' bg='gray.900' px={5}>
        {!collapsed && content}
      </Flex>
    </VStack>
  );
};

export default ExpandBox;
