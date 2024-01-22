import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { supabaseClient } from '../supabase';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Profile = ({ profile, setProfile }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploadLoading, setIsImageUploadLoading] = useState(false);
  const navigate = useNavigate();

  const updateHandler = async event => {
    event.preventDefault();
    setIsLoading(true);
    const body = {
      username: profile.username,
      website: profile.website,
      bio: profile.bio,
    };
    const userId = profile.id;
    const { error } = await supabaseClient
      .from('profiles')
      .update(body)
      .eq('id', userId);
    if (!error) {
      setProfile({
        ...profile,
        username: body.username,
        website: body.website,
        bio: body.bio,
      });
    }
    setIsLoading(false);
  };

  function makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const uploadHandler = async event => {
    setIsImageUploadLoading(true);
    const avatarFile = event.target.files[0];
    const fileName = makeid(10);

    const { error } = await supabaseClient.storage
      .from('avatars')
      .upload(fileName, avatarFile, {
        cacheControl: '3600',
        upsert: false,
      });
    if (error) {
      setIsImageUploadLoading(false);
      console.log('error', error);
      return;
    }
    const { data, error: publicURLError } = supabaseClient.storage
      .from('avatars')
      .getPublicUrl(fileName);
      console.log(data)
    if (publicURLError) {
      setIsImageUploadLoading(false);
      console.log('publicURLError', publicURLError);
      return;
    }
    const userId = profile.id;
    await supabaseClient
      .from('profiles')
      .update({
        avatarurl: data.publicUrl,
      })
      .eq('id', userId);
    setProfile({ ...profile, avatarurl: data.publicUrl });
    setIsImageUploadLoading(false);
  };

  return (
    <Box>
      <Box mt="8" maxW="xl" mx="auto">
        <IconButton
          aria-label="back"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate(-1)}
        />
        <Flex align="center" justify="center" direction="column">
          <Avatar
            size="2xl"
            src={profile.avatarurl || ''}
            name={profile.username || profile?.email}
          />
          <FormLabel
            htmlFor="file-input"
            my="5"
            borderRadius="2xl"
            borderWidth="1px"
            textAlign="center"
            p="2"
            bg="blue.400"
            color="white"
          >
            {isImageUploadLoading ? 'Uploading.....' : 'Upload Profile Picture'}
          </FormLabel>
          <Input
            type="file"
            hidden
            id="file-input"
            onChange={uploadHandler}
            multiple={false}
            disabled={isImageUploadLoading}
          />
        </Flex>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={5}
          mt="-2"
          spacing="4"
          as="form"
          onSubmit={updateHandler}
        >
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" isDisabled={true} value={profile?.email} />
          </FormControl>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Add your username here"
              type="text"
              value={profile.username}
              onChange={event =>
                setProfile({ ...profile, username: event.target.value })
              }
            />
          </FormControl>
          <FormControl id="website" isRequired>
            <FormLabel>Website URL</FormLabel>
            <Input
              placeholder="Add your website here"
              type="url"
              value={profile.website}
              onChange={event =>
                setProfile({
                  ...profile,
                  website: event.target.value,
                })
              }
            />
          </FormControl>
          <FormControl id="bio" isRequired>
            <FormLabel>Bio</FormLabel>
            <Textarea
              placeholder="Add your bio here"
              value={profile.bio}
              onChange={event =>
                setProfile({
                  ...profile,
                  bio: event.target.value,
                })
              }
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" isLoading={isLoading}>
            Update
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Profile;
