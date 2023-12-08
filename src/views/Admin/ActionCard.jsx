import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ActionCard = ({
  icon: IconComponent,
  title,
  description,
  linkTarget,
}) => (
  <Link to={linkTarget}>
    <Box
      bg='gray.700'
      border={1}
      borderRadius={16}
      p={2}
      display='flex'
      alignItems='center'
      w={400}
      _hover={{
        bg: 'gray.800',
        cursor: 'pointer',
      }}
    >
      <Box ml={5}>
        <IconComponent size={40} />
      </Box>
      <Box m={2} mr={0} alignItems='center' width='full'>
        <Text fontSize='lg' fontWeight='bold' letterSpacing='0.1em' mb={2}>
          {title}
        </Text>
        <Text fontSize='s'>{description}</Text>
      </Box>
    </Box>
  </Link>
);

ActionCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  linkTarget: PropTypes.string.isRequired,
};

export default ActionCard;
