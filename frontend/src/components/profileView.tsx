import { useState, useEffect, ReactNode } from "react";
import {
  Box,
  Button,
  Flex,
  Avatar,
  Text,
  HStack,
  Link,
  Input,
  IconButton,
  useDisclosure,
  Stack,
  Heading,
  Image,
  SimpleGrid
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as ReactRouter } from "react-router-dom";
import { Logo } from "../components/logo";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_PROFILES } from "../queries/getProfiles";
// import { createPost } from "../actions/createPostActions";

declare var window: any;
const Links = ["PROFILES", "FEED", "TEAM"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    color={"whiteAlpha.900"}
    _hover={{
      textDecoration: "none",
      bg: "blackAlpha.400",
    }}
    bg={"blue.900"}
    fontWeight={"540"}
    to={`/${children}`}
    as={ReactRouter}
  >
    {children}
  </Link>
);

export const ProfileView = (address: any, profileID: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeProfileIndex, setActiveProfileIndex] = useState(0);

  useEffect(() => {

    const selectProfile = (address: any) => {
        let tempIndex = 0;
    
        for (let i = 0; i < data.profiles.items.length; i++) {
            
          if (data.profiles.items[i].id === address.dataFromParent2 ) {
            tempIndex = i;
            setActiveProfileIndex(tempIndex);

            console.log('tempindex', tempIndex);
            console.log('active profile index', activeProfileIndex);
        
                       
            };
        };
       
        return tempIndex;
      };
    
    selectProfile(address);
       
  }, [activeProfileIndex]);
  
  const { loading, error, data } = useQuery(GET_PROFILES, {
    variables: {
      request: {
        ownedBy: [address.dataFromParent1],
      },
    },
    skip: address === "",
  });

  

  console.log("Profile view profileID", profileID);
  console.log("Profile view address", address);
  console.log("data from Get Profiles", data);
  
  /*
  const createPostAction = async () => {
    const postData = await createPost();

  }
  */

  

  return (
    <SimpleGrid columns={3} spacing="10px">
        <Box border='1px' borderColor='gray.200' 
        
        height="640px"
        rounded={"lg"}
        
        m="5px">

            <Text fontSize='md'
            bg="green.100"
            height="100px"
            m="15px"
            p="5px"
            boxShadow='sm'
            rounded={"lg"} >
                My Profile<br></br>
                {data.profiles.items[activeProfileIndex].handle}<br></br>
                
            </Text>
            
            <Text fontSize='lg'
            bg="#eeeeee"
            height="200px"
            m="15px"
            p="5px"
            boxShadow='sm'
            rounded={"lg"} >Share/Post

        <Input variant='outline' placeholder='' h='100px' width='auto' bg='#ffffff' m='5px' />    
        
        

            </Text>

             <Text fontSize='lg'
            
            height="200px"
            m="15px"
            p="5px"
            boxShadow='sm'
            rounded={"lg"} >My Publications
            </Text>

            <Box fontSize='md'
            bg="red.100"
            height="50px"
            m="15px"
            p="5px"
            boxShadow='sm'
            rounded={"lg"} >Go Live
            </Box>


            </Box>

        <Box border='1px' borderColor='gray.200' 
         height="640px"
        rounded={"lg"}
        
        m="5px"
        >

            <Text fontSize='lg'
            
            height="600px"
            m="15px"
            p="5px"
            boxShadow='sm'
            rounded={"lg"} >Feed / Publication Posts
            </Text>
        </Box>
        <Box border='1px' borderColor='gray.200'  height="640px"
        rounded={"lg"}
        
        m="5px"
        >
            <Text fontSize='md'
            bg="#eeeeee"
            height="100px"
            m="15px"
            p="5px"
            boxShadow='sm'
            rounded={"lg"} >Find People
            </Text>

            <Text fontSize='md'
            bg="#eeeeee"
            height="100px"
            m="15px"
            p="5px"
            boxShadow='sm'
            rounded={"lg"} >Search
            </Text>

            <Text fontSize='md'
            bg="blue.100"
            height="100px"
            m="15px"
            p="5px"
            boxShadow='sm'
            rounded={"lg"} >News
            </Text>

            <Text fontSize='md'
            bg="blue.100"
            height="100px"
            m="15px"
            p="5px"
            boxShadow='sm'
            rounded={"lg"} >Sports
            </Text>
        </Box>
    </SimpleGrid>

  );

  /*
  return (
    <>
      <Box>
        <Flex h={16}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            marginLeft="auto"
            mt={"10px"}
          />
          <Logo />
          <HStack
            as={"nav"}
            spacing={10}
            display={{ base: "none", md: "flex" }}
            marginLeft="250px"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>


    </>
  );
  */

};
