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
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useAddNote, useEditNote } from '../api/queriesAndMutations';

const NoteModal = ({
  editing,
  inputtext,
  setInputtext,
  uuid,
  toast,
  modalIsOpen,
  setModalIsOpen,
  noteId,
  setId,
}) => {
  const addNote = useAddNote();
  const editNote = useEditNote();
  const textColor = useColorModeValue('gray.500', 'gray.400');
  const bgCardColor = useColorModeValue(
    'brand.secondaryBgLight',
    'brand.secondaryBgDark'
  );

  //edit note
  async function clickEditHandler(e) {
    e.preventDefault();
    editNote.mutate({
      title: inputtext.title,
      description: inputtext.description,
      noteId,
    });
    setId(null);
    setModalIsOpen(false);
    setInputtext({ title: null, description: null });
    if (!editNote.isPending)
      toast({
        description: editNote.error ? editNote.error.message : 'Note saved',
        status: editNote.error ? 'error' : 'success',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
  }

  //add a new note
  async function clickAddHandler(e) {
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
    addNote.mutate({
      title: inputtext.title,
      description: inputtext.description,
      uuid,
    });
    setInputtext({ title: null, description: null });
    setModalIsOpen(false);
    if (!addNote.isPending)
      toast({
        description: addNote.error ? addNote.error.message : 'Note added',
        status: addNote.error ? 'error' : 'success',
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
        setInputtext({ title: null, description: null });
        setId(null);
        setModalIsOpen(false);
      }}
    >
      <ModalOverlay />
      <form
        onSubmit={e => {
          editing ? clickEditHandler(e) : clickAddHandler(e);
        }}
      >
        <ModalContent bg={bgCardColor}>
          <ModalHeader>Add a new note</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="new-note-title">Title</FormLabel>
              <Input
                id="new-note-title"
                mb={4}
                placeholder="Title"
                value={inputtext.title}
                color={textColor}
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
                color={textColor}
                onChange={e =>
                  setInputtext({ ...inputtext, description: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="gray"
              mr={3}
              onClick={() => {
                setModalIsOpen(!modalIsOpen);
                setInputtext({ title: null, description: null });
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              type="submit"
              isLoading={editing ? editNote.isPending : addNote.isPending}
            >
              {editing ? 'Save note' : 'Add note'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default NoteModal;
