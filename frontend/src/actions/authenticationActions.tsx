import { ethers } from "ethers";
import { gql } from "@apollo/client/core";
import { apolloClient } from "../lib/apollo-client";
import { getAuthenticationToken, setAuthenticationToken } from "../lib/state";
declare var window: any;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

export const generateChallenge = (address: string) => {
  return apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
};

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const authenticate = (address: string, signature: string) => {
  return apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
};
export const login = async (address: string) => {
  if (getAuthenticationToken()) {
    console.log("login: already logged in");
    return;
  }

  console.log("login: address", address);

  // we request a challenge from the server
  const challengeResponse = await generateChallenge(address);

  // sign the text with the wallet
  const signature = await provider
    .getSigner()
    .signMessage(challengeResponse.data.challenge.text);

  const accessTokens = await authenticate(address, signature);
  console.log("login: result", accessTokens.data);

  setAuthenticationToken(accessTokens.data.authenticate.accessToken);

  return accessTokens.data;
};
