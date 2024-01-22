import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { supabaseClient } from '../supabase';

const NoteModal = ({ inputtext, setInputtext, uuid, toast, modalIsOpen , setModalIsOpen}) => {
  const [loading, setLoading] = useState(false);

  async function addNote(e) {
    e.preventDefault();
    if (inputtext.title === null || inputtext.title === '')
      return toast({
        description: 'Title cannot be blank',
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
    if (inputtext.description === null || inputtext.description === '')
      return toast({
        description: 'Description cannot be blank',
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
    setLoading(true);
    const { error } = await supabaseClient
      .from('todos')
      .insert([
        {
          title: inputtext.title,
          description: inputtext.description,
          user_id: uuid,
        },
      ])
      .select();
    setInputtext({ title: null, description: null });
    setLoading(false);
    setModalIsOpen(false);
    toast({
      description: error ? error.message : 'Note added',
      status: error ? 'error' : 'success',
      variant: 'left-accent',
      duration: 3000,
      isClosable: true,
    });
  }
  return (
    <Modal isOpen={modalIsOpen} closeOnOverlayClick={true} onClose={() => {setModalIsOpen(false)}}>
      <ModalOverlay />
      <form onSubmit={addNote}>
        <ModalContent>
          <ModalHeader>Add a new note</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            {/* <Lorem count={2} /> */}
            {/* <Flex flex="row"> */}
            <Input
              mb={4}
              placeholder="Title"
              value={inputtext.title}
              onChange={e =>
                setInputtext({ ...inputtext, title: e.target.value })
              }
            />
            <Input
              placeholder="Description here"
              value={inputtext.description}
              onChange={e =>
                setInputtext({ ...inputtext, description: e.target.value })
              }
            />
            {/* </Flex> */}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={() => {setModalIsOpen(!modalIsOpen)}}>
              Cancel
            </Button>
            <Button variant="outline" type="submit" isLoading={loading}>
              Add note
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default NoteModal;
