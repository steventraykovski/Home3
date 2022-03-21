import React from "react";
import { Flex, Heading, Link, Image, Text } from "@chakra-ui/react";
import { Link as ReactRouter } from "react-router-dom";
export const Logo = () => {
  return (
    <Flex alignItems="flex-end">
      <Heading color="whiteAlpha.900" mr="60px">
        <Link as={ReactRouter} to="/">
          {/* <Image
            boxSize={{
              base: "100px",
              md: "125px",
              xl: "200px",
            }}
            // src={}
            marginBottom={{
              base: "-100px",
              md: "-125px",
              xl: "-200px",
            }}
          /> */}
          <Text>LOGO</Text>
        </Link>
      </Heading>
    </Flex>
  );
};
