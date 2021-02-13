import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { usePostQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string
  });

  const [{ data, fetching }] = usePostQuery({variables});

  if (!fetching && !data) {
    return <div>Something went wrong fetching the posts :/</div>;
  }
  
  useEffect(() => console.log(data), [data]);
  

  return (
    <Layout>
      <Flex alignItems={"center"}>
        <Heading>LiReddit</Heading>

        <NextLink href="/create-post">
          <Link ml={"auto"}>Create Post</Link>
        </NextLink>
      </Flex>
      {!data ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8} mt={8}>
          {/* {data.posts.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))} */}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            isLoading={fetching}
            mx={"auto"}
            my={8}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
// enable ssr (server side rendering) when the content from the request
// is important for SEO (like posts)
