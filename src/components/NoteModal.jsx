import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { supabaseClient } from '../supabase';

const NoteModal = ({
  editing,
  inputtext,
  setInputtext,
  uuid,
  toast,
  modalIsOpen,
  setModalIsOpen,
  noteId,
  setId
}) => {
  const [loading, setLoading] = useState(false);

  //edit note
  async function editNote(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabaseClient
      .from('todos')
      .update({
        title: inputtext.title,
        description: inputtext.description,
      })
      .eq('id', noteId)
      .select();
    setLoading(false);
    setId(null);
    setModalIsOpen(false);
    setInputtext({ title: null, description: null });
    toast({
      description: error ? error.message : 'Note edited',
      status: error ? 'error' : 'success',
      variant: 'left-accent',
      duration: 3000,
      isClosable: true,
    });
  }

  //add a new note
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
    <Modal
      isOpen={modalIsOpen}
      closeOnOverlayClick={true}
      onClose={() => {
        setModalIsOpen(false);
      }}
    >
      <ModalOverlay />
      <form
        onSubmit={(e) => {
          editing ? editNote(e) : addNote(e);
        }}
      >
        <ModalContent>
          <ModalHeader>Add a new note</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="new-note-title">Title</FormLabel>
              <Input
                id="new-note-title"
                mb={4}
                placeholder="Title"
                value={inputtext.title}
                onChange={e =>
                  setInputtext({ ...inputtext, title: e.target.value })
                }
              />
              <FormLabel htmlFor="new-note-title">Description</FormLabel>
              <Textarea
                id="new-note-description"
                height="200"
                placeholder="Description here"
                value={inputtext.description}
                resize="none"
                onChange={e =>
                  setInputtext({ ...inputtext, description: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                setModalIsOpen(!modalIsOpen);
                setInputtext({ title: null, description: null });
              }}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={loading}>
              {editing ? 'Save note' : 'Add note'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default NoteModal;
