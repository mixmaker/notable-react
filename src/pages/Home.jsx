import React, { useState } from 'react';
import {
  Box,
  Text,
  Heading,
  Center,
  VStack,
  HStack,
  Button,
  Avatar,
  useColorMode,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  SimpleGrid,
  Switch,
  Progress,
} from '@chakra-ui/react';
import DeleteButton from '../components/DeleteButton';
import NoteModal from '../components/NoteModal';
import { supabaseClient } from '../supabase';
import { useNavigate } from 'react-router-dom';
import useSupabase from '../hooks/useSupabase';
import { fetchNotes } from '../supaservice';

function Home({ user, profile, toast }) {
  const navigate = useNavigate();
  const { loading, data: notes, error } = useSupabase(fetchNotes);
  const { colorMode, toggleColorMode } = useColorMode();
  if (error) {
    toast({
      description: error.message,
      status: 'error',
      variant: 'left-accent',
      duration: 3000,
      isClosable: true,
    });
  }
  const [inputtext, setInputtext] = useState({
    title: null,
    description: null,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <Box height="100vh" pt={20}>
      <HStack
        spacing={6}
        position="absolute"
        top="4"
        right="6"
        justifyContent="center"
      >
        <HStack>
          <Text>Dark Mode</Text>
          <Switch
            value="true"
            defaultChecked={colorMode === 'light' ? false : true}
            onChange={toggleColorMode}
          />
        </HStack>
        <Avatar
          size="sm"
          src={profile.avatarurl || ''}
          name={user?.email}
          // position="absolute"
          // top="6"
          // right="126"
          cursor="pointer"
          onClick={() => {
            navigate('/profile');
          }}
        />
        <Button
          // position="absolute"
          variant="outline"
          // top="4"
          // right="6"
          onClick={() => supabaseClient.auth.signOut()}
        >
          Log out
        </Button>
      </HStack>
      <Center display="flex" flexDirection="column">
        <Heading
          fontSize="35px"
          mb={2}
          bgGradient="linear(to-tl, #eaeaff, #6666ff)"
          bgClip="text"
        >
          Notable
        </Heading>
        {/* <AddButton
          inputtext={inputtext}
          setInputtext={setInputtext}
          toast={toast}
          uuid={uuid}
        /> */}
        {loading ? (
          <>
            {/* <Text mt={10}>Loading...</Text> */}
            <Progress
              mt={10}
              width="80"
              height="1"
              isIndeterminate
              borderRadius={18}
            />
          </>
        ) : !notes || !notes.length ? (
          <Center mt={10}>
            <Text>No notes to show</Text>
          </Center>
        ) : (
          <VStack width="80%" listStyleType="none" mt={5}>
            <SimpleGrid
              width="100%"
              gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
              spacing={4}
            >
              {notes.map(item => NoteItem({ item, toast }))}
            </SimpleGrid>
          </VStack>
        )}
        <Button mt={6} onClick={() => setModalIsOpen(!modalIsOpen)}>
          Add new note
        </Button>
        <NoteModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          inputtext={inputtext}
          setInputtext={setInputtext}
          toast={toast}
          uuid={user.id}
        />
      </Center>
    </Box>
  );
}

const NoteItem = ({ item, toast }) => (
  <Card align="center" maxWidth="600" key={item.id}>
    <CardHeader>
      <Heading size="md">{item.title}</Heading>
    </CardHeader>
    <CardBody>
      <Text>{item.description}</Text>
    </CardBody>
    <CardFooter>
      <DeleteButton item={item} toast={toast} />
    </CardFooter>
  </Card>
);
export default Home;
