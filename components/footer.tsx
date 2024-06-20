import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      bgGradient="linear-gradient(141deg, #f7357c7e 0%, #f49f637e 95%)"
      h="30vh"
      w="full"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontWeight={700} fontStyle="italic" position="relative" top="10vh">
        All rights are reserved
      </Text>

      <Box
        borderBottomLeftRadius={40}
        borderBottomRightRadius={40}
        h="10vh"
        w="full"
        bgColor="white"
        position="absolute"
        top={0}
        right={0}
      />
    </Box>
  );
};

export default Footer;
