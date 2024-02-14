import { supabaseClient } from './supabase';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  useNavigate,
} from 'react-router-dom';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { useToast } from '@chakra-ui/react';

const Root = () => {
  const toast = useToast();
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState({
    username: '',
    website: '',
    bio: '',
    avatarurl: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      // const { data: signedInUser } = await supabaseClient.auth.gey();
      if (event === 'SIGNED_IN') {
        const userId = session?.user.id;
        supabaseClient
          .from('profiles')
          .upsert({ id: userId })
          .then((_data, error) => {
            if (!error) navigate('/');
          });
      }
      if (event === 'SIGNED_OUT') navigate('/login');
      if (!session) navigate('/login');
      setSession(session);
      // console.log(session);
    });
    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    session && getUserProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function getUserProfile() {
    supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', session?.user.id)
      .then(({ data, error }) => {
        if (!error) {
          setProfile({
            ...profile,
            username: data[0].username,
            website: data[0].website,
            bio: data[0].bio,
            avatarurl: data[0].avatarurl,
          });
        }
        // console.log(data);
      });
    // console.log(data);
  }

  return (
    <Routes>
      {session && (
        <Route
          path="/"
          element={
            // session?.user ? (
            <Home
              user={session?.user}
              profile={{
                ...profile,
                email: session?.user.email,
                id: session?.user.id,
              }}
              setProfile={setProfile}
              toast={toast}
            />
            // ) : (
            //   <Login/>
            // )
          }
        />
      )}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {session?.user && (
        <Route
          path="/profile"
          element={
            <Profile
              profile={{
                ...profile,
                email: session?.user.email,
                id: session?.user.id,
              }}
              setProfile={setProfile}
              toast={toast}
            />
          }
        />
      )}
    </Routes>
  );
};

// export default App;
const router = createBrowserRouter([{ path: '*', Component: Root }]);

// 4️⃣ RouterProvider added
export default function App() {
  return <RouterProvider router={router} />;
}
