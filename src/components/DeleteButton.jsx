import { IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import {supabaseClient} from '../supabase';
import { FaTrash } from 'react-icons/fa';

const DeleteButton = ({ item, toast }) => {
  const [loading, setLoading] = useState(false);

  async function deleteNote({ id, toast }) {
    setLoading(true);
    const { error } = await supabaseClient.from('todos').delete().eq('id', id);
    setLoading(false);
    toast({
      description: error ? error.message : 'Note deleted',
      status: error ? 'error' : 'success',
      variant: 'left-accent',
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <IconButton
      ml={5}
      isLoading={loading}
      icon={<FaTrash />}
      size="s"
      onClick={() => deleteNote({ id: item.id, toast })}
    >
      delete
    </IconButton>
  );
};

export default DeleteButton;
