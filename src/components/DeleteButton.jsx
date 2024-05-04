import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useDeleteNote } from '../api/queriesAndMutations';

const DeleteButton = ({ item, toast }) => {
  const deleteNote = useDeleteNote();

  return (
    <IconButton
      // ml={5}
      isLoading={deleteNote.isPending}
      icon={<FaRegTrashAlt />}
      // size="s"
      onClick={() => {
        deleteNote.mutate(item.id);
        if (!deleteNote.isPending)
          toast({
            description: deleteNote.isError
              ? deleteNote.error.message
              : 'Note deleted',
            status: deleteNote.error ? 'error' : 'success',
            variant: 'left-accent',
            duration: 3000,
            isClosable: true,
          });
      }}
    />
  );
};

export default DeleteButton;
