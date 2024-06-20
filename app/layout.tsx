import React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "@/components/providers";
import { Box, Container } from "@chakra-ui/react";
import Footer from "@/components/footer";

const inter = Poppins({ subsets: ["latin"], weight: "400", preload: true });

export const metadata: Metadata = {
  title: "LinkHub",
  description: "Website that actually connects people",
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Box>
            <Box
              bgGradient="linear-gradient(141deg, rgba(247,53,123,1) 0%, rgba(244,160,99,1) 95%)"
              h="40vh"
              position="relative"
            >
              <Box
                borderTopLeftRadius={40}
                borderTopRightRadius={40}
                h="100px"
                w="full"
                bgColor="white"
                position="absolute"
                bottom={0}
                left={0}
              />
            </Box>

            <Container maxW="container.lg">
              <Box
                top="-25vh"
                boxShadow="lg"
                bgColor="white"
                borderRadius="12px"
                position="relative"
              >
                {children}
              </Box>
            </Container>

            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
