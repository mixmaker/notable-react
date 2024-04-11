const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase.table('your_table_name').select(1); // Replace with any table name
    if (error) {
      console.error('Error pinging Supabase:', error);
      res.status(500).json({ message: 'Error keeping project active' });
    } else {
      console.log('Successfully pinged Supabase, keeping project active.');
      res.status(200).json({ message: 'Project active' });
    }
  } catch (error) {
    console.error('Error keeping project active:', error);
    res.status(500).json({ message: 'Error keeping project active' });
  }
}
