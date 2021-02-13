import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching: LogoutFetch }] = useMeQuery({
    pause: isServer(), //pause query when page is rendered on server
  });
  const [{ fetching }, logout] = useLogoutMutation();

  let body = null;

  if (fetching) {
    //nothing
  } else if (data?.me) {
    //logged in
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button variant="link" isLoading={LogoutFetch} onClick={() => logout()}>
          Logout
        </Button>
      </Flex>
    );
  } else {
    //not logged in
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  }

  return (
    <Flex position="sticky" zIndex={2} top={0} bg="tomato" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
