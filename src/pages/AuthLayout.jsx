import {
  Box,
  Center,
  HStack,
  Switch,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedOutlet from '../components/AnimatedOutlet';

const AuthLayout = () => {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();

  const height = location.pathname === '/login' ? 480 : 580;

  const bg = useColorModeValue('white', '#111');
  const cardBg = useColorModeValue('gray.50', '#141414');
  const border = useColorModeValue(
    '0.5px solid #d5d5d5',
    '0.5px solid #414141'
  );

  return (
    <Box position="relative">
      <Center h="100vh" bg={bg}>
        <Box
          w="450px"
          border={border}
          borderRadius={10}
          py={12}
          px={10}
          bg={cardBg}
          boxShadow="rgba(60, 64, 67, 0.3) 0px 20px 40px -30px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
        >
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            animate={{ height }}
            transition={{ duration: 0.7 }}
            // height={height}
            duration={500}
            easing="ease-in-out"
          >
            <AnimatedOutlet />
          </motion.div>
        </Box>
      </Center>
      <HStack position="absolute" right={8} top={6}>
        <Switch
          colorScheme="brand"
          value="true"
          defaultChecked={colorMode === 'light' ? false : true}
          onChange={toggleColorMode}
        />
      </HStack>
    </Box>
  );
};

export default AuthLayout;
