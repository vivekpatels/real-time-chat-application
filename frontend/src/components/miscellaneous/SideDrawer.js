import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import { Box, Text } from "@chakra-ui/layout";
import { Flex, Input, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { Stack, HStack, VStack } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { Button, Tooltip } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import ProfileModal from './ProfileModal';
import {useNavigate} from "react-router-dom"
import NotificationBadge from "react-notification-badge";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import ChatLoading from '../ChatLoading';
import UserListItem from "../userAvatar/UserListItem";


const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const navigate = useNavigate();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };



  return (
    <>
      <Flex d="flex"
          justifyContent="space-between"
          alignItems="center"
          bg="white"
          w="100%"
          p="5px 10px 5px 10px"
          borderWidth="5px">
        <Box
          
        >
          <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
            <Button variant="ghost"  onClick={onOpen}>
            <i className="fas fa-search"></i>
              <Text d={{ base: "none", md: "flex" }} px={4}>
                Search User
              </Text>
            </Button>
          </Tooltip>
          </Box>
          <Box>
          <Text fontSize="2xl" fontFamily="Work sans">
            Chatter Room
          </Text>
          </Box>
          <HStack spacing='24px'>
    <Box>     <div>
            <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                // count={notification.length}
                // effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            </Menu>
          </div></Box>
    <Box><div>
            <Menu>
              <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user.name}
                  src={user.pic}
                />
              </MenuButton>
              <MenuList>
                <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
                </ProfileModal>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div></Box>
  </HStack>
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Flex>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              </Box>
              <Box pl={2}>
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            </Flex>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer