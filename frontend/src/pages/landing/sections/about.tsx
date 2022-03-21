import React from "react";
import { Box, Text, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
export const About = () => {
  return (
    <Box
      w="full"
      bg="whiteAlpha.900"
      px={{
        base: "50px", // 0-48em
        md: "100px", // 48em-80em,
        xl: "200px", // 80em+
      }}
      py="100px"
    >
      <Box>
        <Flex justifyContent="center" alignItems="center">
          <VStack>
            <Heading
              fontSize={{
                base: 20, // 0-48em
                md: 44, // 48em-80em,
                xl: 54, // 80em+
              }}
              color="blackAlpha.900"
            >
              ABOUT US
            </Heading>
            <Text textAlign={"center"}>Information about Home3</Text>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

// MindJam is a platform for mind games and mind-building content - crossword puzzles, memory challenges, educational games, and more - all available via the blockchain.

// Players can connect their wallet to access games for free via a web interface and opt to pay a small fee for clues or access to answers.

// Creators can tap into the MindJam platform and submit their own unique games for free and tap into a mind game ecosystem of players and share in the revenue earned.
