import React, { useState } from 'react'
import "../App.css"
import { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import Chatbox from '../components/Chatbox';

import { Flex, Spacer } from '@chakra-ui/react'

const Chatpage = () => {

  const [fetchAgain, setFetchAgain] = useState(false);
 const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
    {user && <SideDrawer />}
      <Flex>
        <Box p={4}>
      {user && <MyChats fetchAgain={fetchAgain} />}
      </Box>
      <Spacer />
      <Box p={4}>
      {user && (
        <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        </Box>
        </Flex>
  </div>
  )
}

export default Chatpage;


<Flex>
  <Box p='4' bg='red.400'>
    Box 1
  </Box>
  <Spacer />
  <Box p='4' bg='green.400'>
    Box 2
  </Box>
</Flex>