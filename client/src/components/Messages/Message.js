import React from 'react'

import {
  Box, 
  UnorderedList,
  ListItem } from '@chakra-ui/react'

import { getDaySent, getTimeSent } from "../../helpers/timestampConverters"

const Message = ({ obj }) => {
  return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='5' my='5' spacing='3' w='80%'>
      <UnorderedList m='0' listStyleType='none'>
        <ListItem><strong>Name:</strong> {obj.username}</ListItem>
        <ListItem><strong>Sent on:</strong> {getDaySent(obj.timestamp)} at {getTimeSent(obj.timestamp)}</ListItem>
        <ListItem><strong>Message:</strong> {obj.message}</ListItem>
      </UnorderedList>
    </Box>
  )
}

export default Message