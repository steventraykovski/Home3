// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Error } from "./error";
import { Loading } from "./loading";
import axios from "axios";

import { useQuery } from "@apollo/client";
import { GET_PROFILES } from "../queries/getProfiles";
export const Profiles = () => {
  // const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [address, setAddress] = useState(
    "0x6F234Fa20558743970ccEBD6AF259fCB49eeA73c"
  );
  const { loading, error, data } = useQuery(GET_PROFILES, {
    variables: {
      request: {
        ownedBy: [address],
      },
      skip: address === "",
    },
  });

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Box>
        {data.profiles.items.map((profile) => {
          <Text>{profile.name}</Text>;
        })}
      </Box>
    );
  }
};
