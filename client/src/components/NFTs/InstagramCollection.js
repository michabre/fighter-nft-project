import React from 'react'
import { Button, Box, Heading, Text } from '@chakra-ui/react';

const InstagramCollection = ({ token }) => {
    function getPosts() {
      let url = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url&access_token=${token}`;

      fetch(url)
      .then((response) => {
        console.log(response)
          //return response.json();
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    getPosts()

    return(
      <Box w='100%' flexGrow="1" p='5' mt='5' className='box-bg' align='center'>
        <Text>Instagram goes here</Text>
      </Box>)
}

export default InstagramCollection