import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';

const EditNote = ({ note, setModalIsOpen, setId, setInputtext }) => {

  return (
    <Button
      mr={3}
      onClick={() => {
        setModalIsOpen(true);
        setId(note.id);
        setInputtext({
          title: note.title,
          description: note.description,
        });
      }}
    >
      edit
    </Button>
  );
};

export default EditNote;
