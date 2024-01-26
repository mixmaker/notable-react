//useSupabase.js

import { useState, useEffect } from 'react';
import { supabaseClient } from '../supabase';

//supaCall calls the Supabase API
const useSupabase = supaCall => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let { data, error } = await supaCall();
        if (error) {
          setError(error);
          // Show toast with relevant error message to user
          // Log error to Airbrake or Sentry
        } else {
          setData(data);
        }
      } catch (e) {
        // Likely to be a network error
        setError(e);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
    getData();
    // eslint-disable-next-line
  }, []);

  //sub to changes
  const notesSub = supabaseClient
    .channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'todos' },
      payload => {
        if (payload.eventType === 'INSERT') {
          // console.log(payload.new);
          // data ? setData([...data, payload.new]) : setData([payload.new]);
          setData(privData => [...privData, payload.new]);
        }
        if (payload.eventType === 'DELETE') {
          const filteredData = data?.filter(item => item.id !== payload.old.id);
          setData(filteredData);
        }
        // console.log('Change received!', payload);
      }
    )
    .subscribe();

  // return () => notesSub.unsubscribe();

  return { loading, data, error };
};

export default useSupabase;
