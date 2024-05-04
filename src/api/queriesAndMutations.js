import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewNote, deleteNote, editNote, fetchNotes } from '.';

export const useGetAllNotes = () =>
  useQuery({
    queryKey: ['allNotes'],
    queryFn: fetchNotes,
  });

export const useAddNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['allNotes']);
    },
    enabled: false,
    mutationFn: ({ title, description, uuid }) =>
      addNewNote({ title, description, uuid }),
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['allNotes']);
    },
    enabled: false,
    mutationFn: id => deleteNote(id),
  });
};

export const useEditNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries('allNotes');
    },
    enabled: false,
    mutationFn: ({ title, description, noteId }) =>
      editNote({ title, description, noteId }),
  });
};
