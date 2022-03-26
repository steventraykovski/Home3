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
  Image,
} from "@chakra-ui/react";
import { Error } from "./error";
import { Loading } from "./loading";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_PROFILES } from "../queries/getProfiles";
import { createProfile } from "../actions/createProfileActions";
import { ethers } from "ethers";
import { ChevronDownIcon } from "@chakra-ui/icons";
import metamaskHorizontal from "../constants/images/metamask-fox-wordmark-horizontal.svg";
import metamaskStacked from "../constants/images/metamask-fox-wordmark-stacked.svg";
import { ProfileView } from "./profileView";

declare var window: any;
const provider = new ethers.providers.Web3Provider(window.ethereum);

type profileType = {
  bio: string;
  handle: string;
  id: string;
  ownedBy: string;
  picture: string;
};
export const Profiles = () => {
  const [address, setAddressState] = useState("");
  const [createdSuccess, setCreatedSuccess] = useState(false);

  // adding state variable for activeProfile - set by clicking on a profile to view it

  const [activeProfile, setActiveProfile] = useState("");

  const connectUsersMeta = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  };
  let handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let account0 = await connectUsersMeta();
    setAddressState(account0);
  };

  window.ethereum.on("accountsChanged", function (accounts: Array<string>) {
    setAddressState(accounts[0]);
  });
  const [createProfData, setCreateProfData] = useState("");

  const handleCreate = async () => {
    const data = await createProfile(address);
    alert("Successfully create new profile!");
    // setTimeout("2000");
    // setCreatedSuccess(true);
  };

  const setProfile = (id: string) => {
    console.log("Profile data from setProfile funct", id);

    setActiveProfile(id);
    console.log("Active Profile", activeProfile);
};

  const { loading, error, data } = useQuery(GET_PROFILES, {
    variables: {
      request: {
        ownedBy: [address],
      },
    },
    skip: address === "",
  });
  console.log(data);
  if (!address.length) {
    return (
      <Box>
        <Flex justifyContent="center" alignItems="center" height="800px">
          <VStack>
            <Box bg={"green.400"} boxSize={"200px"}>
              <Text
                textColor="whiteAlpha.900"
                textAlign={"center"}
                py="55px"
                fontWeight={"900"}
                px="20px"
              >
                Please connect your MetaMask wallet to see your profiles!
              </Text>
              <Text textColor={"whiteAlpha.800"} textAlign={"center"}></Text>
            </Box>
            <ChevronDownIcon boxSize={"50px"} />
            <Button
              onClick={handleSubmit}
              bg={"blackAlpha.600"}
              boxSize={"175px"}
              maxH={"55px"}
            >
              <Image src={metamaskHorizontal} />
            </Button>
          </VStack>
        </Flex>
      </Box>
    );
  }
  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  } 
  
  //adding in condition to pull profile view component if a profile has been set

  else if (activeProfile) {

    let launchProfile = activeProfile;

    return <ProfileView dataFromParent1 = {address} dataFromParent2 = {launchProfile} />;
    
  }

  
  else if (data) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} height={"800px"}>
        <VStack>
          <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Heading size={"xs"} pl={"10px"} pt={"10px"}>
              My Profiles
            </Heading>
            {data.profiles.items.map((profile: profileType) => {
              console.log(profile);
              return (
                <Box p="3" key={profile.id}>
                  <HStack>
                    <Avatar name={profile.picture} src="" />
                    <Text>{profile.handle}</Text>

                  
                    <Button onClick={() => setProfile(profile.id)}
                      bg={"blue.100"}
                      color="whiteAlpha.900"
                    >
                    View
                    </Button>

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
                bg={"green.400"}
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
