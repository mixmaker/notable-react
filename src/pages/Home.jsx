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
} from '@chakra-ui/react';
import DeleteButton from '../components/DeleteButton';
import NoteModal from '../components/NoteModal';
import { supabaseClient } from '../supabase';
import { useNavigate } from 'react-router-dom';

function Home({ user, profile, allNotes, loading, toast }) {
  const navigate = useNavigate();

  const [inputtext, setInputtext] = useState({
    title: null,
    description: null,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <Box height="100vh" pt={20}>
      <Avatar
        size="sm"
        src={profile.avatarurl || ''}
        name={user?.email}
        position="absolute"
        top="6"
        right="126"
        cursor="pointer"
        onClick={() => {
          navigate('/profile');
        }}
      />
      <Button
        position="absolute"
        variant="outline"
        top="4"
        right="6"
        onClick={() => supabaseClient.auth.signOut()}
      >
        Log out
      </Button>
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
          <Text mt={10}>Loading...</Text>
        ) : !allNotes || !allNotes.length ? (
          <Center mt={10}>
            <Text>No notes to show</Text>
          </Center>
        ) : (
          <VStack listStyleType="none" mt={5}>
            {allNotes.map(item => NoteItem({ item, toast }))}
          </VStack>
        )}
        <Button mt={6} onClick={() => setModalIsOpen(!modalIsOpen)}>
          add new
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
  <HStack
    key={item.id}
    w="300px"
    py={3}
    px={4}
    mr={2}
    borderRadius={6}
    // marginY={2}
    bgColor="#f1f7f9"
    display="flex"
    justifyContent="space-between"
  >
    <VStack>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </VStack>
    <DeleteButton item={item} toast={toast} />
  </HStack>
);
export default Home;
