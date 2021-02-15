import { Box, Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetIdFromUrl } from "../../utils/useGetIdFromUrl";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const intId = useGetIdFromUrl();
  const [{ data, fetching }] = usePostQuery({
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <Layout>
        <Box>Loading ...</Box>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      <EditDeletePostButtons id={data.post.id} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
