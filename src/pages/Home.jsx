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
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import DeleteButton from '../components/DeleteButton';
import NoteModal from '../components/NoteModal';
import { supabaseClient } from '../supabase';
import { useNavigate } from 'react-router-dom';
import EditNote from '../components/EditNote';
import { useGetAllNotes } from '../api/queriesAndMutations';
import { MdAdd } from 'react-icons/md';
import { PiGhost } from 'react-icons/pi';

function Home({ user, profile, toast }) {
  const navigate = useNavigate();
  const { data: notes, isLoading, isError, error } = useGetAllNotes();
  const { colorMode, toggleColorMode } = useColorMode();
  if (isError && error) {
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
  const [id, setId] = useState(null); //to track which note we're editing
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const textColor = useColorModeValue(
    'brand.textSecondaryLight',
    'brand.textSecondaryDark'
  );
  const bgCardColor = useColorModeValue(
    'brand.secondaryBgLight',
    'brand.secondaryBgDark'
  );

  const NoteItem = ({ item }) => (
    <Card align="center" maxWidth="600" key={item.id} bg={bgCardColor}>
      <CardHeader>
        <Heading size="md">{item.title}</Heading>
      </CardHeader>
      <CardBody>
        <Text color={textColor}>{item.description}</Text>
      </CardBody>
      <CardFooter>
        <EditNote
          note={item}
          setModalIsOpen={setModalIsOpen}
          setId={setId}
          setInputtext={setInputtext}
        />
        <DeleteButton item={item} toast={toast} />
      </CardFooter>
    </Card>
  );

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
            colorScheme="brand"
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
          fontSize="42px"
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
        {isLoading ? (
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
          <Center mt={10} display="flex" flexDirection="column">
            <PiGhost size={30} />
            <Text>Boo, it's lonely in here...</Text>
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
        <IconButton
          colorScheme="brand" // size={22}
          position="fixed"
          bottom="5%"
          right="2%"
          onClick={() => setModalIsOpen(!modalIsOpen)}
          icon={<MdAdd size={22} />}
        />

        <NoteModal
          editing={id}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          inputtext={inputtext}
          setInputtext={setInputtext}
          toast={toast}
          uuid={user.id}
          noteId={id}
          setId={setId}
        />
      </Center>
    </Box>
  );
}

export default Home;
