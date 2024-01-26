import { supabaseClient } from '../supabase';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  chakra,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdAlternateEmail } from 'react-icons/md';
import { PiPassword } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputv, setInputv] = useState({ email: null, password: null });

  const submitHandler = async event => {
    event.preventDefault();
    setIsLoading(true);
    // setError(null);
    try {
      const { error } = await supabaseClient.auth.signUp({
        email: inputv.email,
        password: inputv.password,
      });
      if (!error) {
        toast({
          description: 'Check your email for verification link',
          status: 'info',
          variant: 'left-accent',
          duration: 3000,
          isClosable: true,
        });
      }
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
        <Text fontSize="18" mb={4}>
          Register to{' '}
          <Heading
            fontSize="35px"
            mb={2}
            bgGradient="linear(to-tl, #eaeaff, #6666ff)"
            bgClip="text"
          >
            Notable
          </Heading>
        </Text>
        <Box mb={6}>
          <Button
            mb={2}
            w="full"
            leftIcon={<FcGoogle size={20} />}
            onClick={() =>
              supabaseClient.auth.signInWithOAuth({
                provider: 'google',
              })
            }
          >
            Continue with Google
          </Button>
          <Button
            w="full"
            leftIcon={<FaGithub size={20} />}
            onClick={() =>
              supabaseClient.auth.signInWithOAuth({
                provider: 'github',
              })
            }
          >
            Continue with Github
          </Button>
        </Box>
        <chakra.form onSubmit={submitHandler}>
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <MdAlternateEmail size={18} />
                </InputLeftElement>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="john@example.com"
                  value={inputv.email}
                  onChange={e =>
                    setInputv({ ...inputv, email: e.target.value })
                  }
                />
              </InputGroup>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <PiPassword size={18} />
                </InputLeftElement>
                <Input
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  placeholder="●●●●●●"
                  value={inputv.password}
                  onChange={e =>
                    setInputv({ ...inputv, password: e.target.value })
                  }
                />
              </InputGroup>
            </FormControl>
            <Button
              colorScheme="purple"
              type="submit"
              size="lg"
              fontSize="md"
              isLoading={isLoading}
            >
              Register
            </Button>
          </Stack>
        </chakra.form>
        <Center mt={2}>
          Already have an account?{' '}
          <Button variant="text" onClick={() => navigate('/login')}>
            Log in
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default Register;
