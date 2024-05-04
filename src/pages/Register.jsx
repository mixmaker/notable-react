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
import { FaGithub, FaUser } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdAlternateEmail } from 'react-icons/md';
import { PiPassword } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import AnimatedLayout from '../components/AnimatedLayout';

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputv, setInputv] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });

  const submitHandler = async event => {
    event.preventDefault();
    setIsLoading(true);
    // setError(null);
    try {
      const { error } = await supabaseClient.auth.signUp({
        options: {
          data: {
            first_name: inputv.firstName,
            last_name: inputv.lastName,
          },
        },
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
    <AnimatedLayout>
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
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <InputGroup style={{ display: 'flex', gap: '10px' }}>
              <InputLeftElement>
                <FaUser size={18} />
              </InputLeftElement>
              <Input
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="John"
                value={inputv.firstName}
                onChange={e =>
                  setInputv({ ...inputv, firstName: e.target.value })
                }
              />
              <Input
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Doe"
                value={inputv.lastName}
                onChange={e =>
                  setInputv({ ...inputv, lastName: e.target.value })
                }
              />
            </InputGroup>
          </FormControl>
          <FormControl id="email" isRequired>
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
                onChange={e => setInputv({ ...inputv, email: e.target.value })}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="password" isRequired>
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
      </AnimatedLayout>
  );
};

export default Register;
