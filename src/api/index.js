import { supabaseClient } from '../supabase';

export async function fetchNotes() {
  let { data } = await supabaseClient
    .from('todos')
    .select('*')
    .order('id', { ascending: true });
  return data;
}

export async function addNewNote({ title, description, uuid }) {
  await supabaseClient
    .from('todos')
    .insert([
      {
        title: title,
        description: description,
        user_id: uuid,
      },
    ])
    .select();
}

export async function deleteNote(id) {
  await supabaseClient.from('todos').delete().eq('id', id);
}

export async function editNote({ title, description, noteId }) {
  await supabaseClient
    .from('todos')
    .update({
      title: title,
      description: description,
    })
    .eq('id', noteId)
    .select();
}
