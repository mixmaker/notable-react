import { supabaseClient } from '../supabase';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  chakra,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputv, setInputv] = useState({ email: null, password: null });

  const submitHandler = async event => {
    event.preventDefault();
    setIsLoading(true);
    // setError(null);
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email: inputv.email,
        password: inputv.password,
      });
      if (error) {
        toast({
          description: error.message,
          status: 'error',
          variant: 'left-accent',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // setIsSubmitted(true);
        navigate('/');
      }
    } catch (error) {
      toast({
        description: error.message,
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center h="100vh">
      <Box
        w="400px"
        border="0.5px solid #969696"
        borderRadius={10}
        py={12}
        px={10}
        boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
      >
        <Text fontSize="18" mb={8}>
          Log in to{' '}
          <Heading
            fontSize="35px"
            mb={2}
            bgGradient="linear(to-tl, #eaeaff, #6666ff)"
            bgClip="text"
          >
            Notable
          </Heading>
        </Text>
        <chakra.form onSubmit={submitHandler}>
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={inputv.email}
                onChange={e => setInputv({ ...inputv, email: e.target.value })}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                autoComplete="password"
                required
                value={inputv.password}
                onChange={e =>
                  setInputv({ ...inputv, password: e.target.value })
                }
              />
            </FormControl>
            <Button type="submit" size="lg" fontSize="md" isLoading={isLoading}>
              Sign in
            </Button>
          </Stack>
        </chakra.form>
        <Center mt={2}>
          Don't have an account? <Button variant="text" onClick={()=>navigate('/register')} >Sign up</Button>
        </Center>
      </Box>
    </Center>
  );
};

export default Login;
