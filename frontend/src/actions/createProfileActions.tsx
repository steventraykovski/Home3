import { gql } from "@apollo/client";
import ethers, { BigNumber, utils } from "ethers";
import { apolloClient } from "../lib/apollo-client";
import { prettyJSON } from "../lib/helpers";
import { CREATE_PROFILE } from "../queries/createProfile";
import { login } from "./authenticationActions";
import { pollUntilIndexed } from "../queries/has-transaction-been-indexed";

const createProfileRequest = (createProfileRequest: {
  handle: string;
  profilePictureUri?: string;
  followNFTURI?: string;
}) => {
  return apolloClient.mutate({
    mutation: CREATE_PROFILE,
    variables: {
      request: createProfileRequest,
    },
  });
};

export const createProfile = async (address: string) => {
  console.log("create profile: address", address);

  await login(address);

  const createProfileResult = await createProfileRequest({
    handle: new Date().getTime().toString(),
  });

  prettyJSON("create profile: result", createProfileResult.data);

  console.log("create profile: poll until indexed");
  const result = await pollUntilIndexed(
    createProfileResult.data.createProfile.txHash
  );

  console.log("create profile: profile has been indexed", result);

  const logs = result.txReceipt.logs;

  console.log("create profile: logs", logs);

  const topicId = utils.id(
    "ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)"
  );
  console.log("topicid we care about", topicId);

  const profileCreatedLog = logs.find((l: any) => l.topics[0] === topicId);
  console.log("profile created log", profileCreatedLog);

  let profileCreatedEventLog = profileCreatedLog.topics;
  console.log("profile created event logs", profileCreatedEventLog);

  const profileId = utils.defaultAbiCoder.decode(
    ["uint256"],
    profileCreatedEventLog[1]
  )[0];

  console.log("profile id", BigNumber.from(profileId).toHexString());

  return result.data;
};
