import {supabaseClient} from './supabase';

export async function fetchNotes() {
  let { data, error } = await supabaseClient.from('todos').select('*');
  return { data, error };
  // setnotes(data);
}


