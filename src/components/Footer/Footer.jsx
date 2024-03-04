import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Footer = () =>
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 1 }}
  >
  <Box mb={{ base: '65px', md: 5 }} textTransform='none' fontSize="large" px={{ base: 4, md: null }}>
    Like this project? Maybe you want to help with&nbsp;
      <Link
        href='https://github.com/kacky-code/kacky-eventpage-frontend'
        isExternal
        textDecoration='underline'
      >
        coding
      </Link>
      &nbsp;or&nbsp;
      <Link
        href='https://ko-fi.com/corkscrew'
        isExternal
        textDecoration='underline'
      >
        server costs
      </Link>
      ?
    </Box>
  </motion.div>
);

export default Footer;
