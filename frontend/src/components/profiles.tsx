// @ts-nocheck
import { useState } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  VStack,
  Heading,
  Avatar,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { Error } from "./error";
import { Loading } from "./loading";
import axios from "axios";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_PROFILES } from "../queries/getProfiles";
import { CREATE_PROFILE } from "../queries/createProfile";
import { createProfile } from "../actions/createProfileActions";
export const Profiles = () => {
  // const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(
    "0x6F234Fa20558743970ccEBD6AF259fCB49eeA73c"
  );
  const [createProfData, setCreateProfData] = useState("");

  const handleCreate = async () => {
    const data = await createProfile(address);
    setCreateProfData(data);
    alert("Success!", data);
  };

  const { loading, error, data } = useQuery(GET_PROFILES, {
    variables: {
      request: {
        ownedBy: [address],
      },
    },
    skip: address === "",
  });
  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  } else if (data) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} height={"800px"}>
        <VStack>
          <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Heading size={"xs"} pl={"10px"} pt={"10px"}>
              My Profiles
            </Heading>
            {data.profiles.items.map((profile) => {
              return (
                <Box p="3" key={profile.id}>
                  <HStack>
                    <Avatar name={profile.picture} src="" />
                    <Text>{profile.handle}</Text>
                  </HStack>
                </Box>
              );
            })}
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Divider width={"75%"} />
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"} py={"20px"}>
              <Button
                onClick={handleCreate}
                bg={"lightgreen"}
                color="whiteAlpha.900"
              >
                Create
              </Button>
            </Flex>
          </Box>
        </VStack>
      </Flex>
    );
  } else {
    return <Button onClick={handleCreate}>create profile</Button>;
  }
};
