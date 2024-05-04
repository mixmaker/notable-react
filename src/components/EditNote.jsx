import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const EditNote = ({ note, setModalIsOpen, setId, setInputtext }) => {
  return (
    <IconButton
      mr={3}
      colorScheme="brand"
      icon={<FaPencilAlt />}
      onClick={() => {
        setModalIsOpen(true);
        setId(note.id);
        setInputtext({
          title: note.title,
          description: note.description,
        });
      }}
    />
  );
};

export default EditNote;
