import { Flex, Text } from "@chakra-ui/react";

type Props = {
  label: string;
  value: number;
};

export const ProfileStat = ({ label, value }: Props) => (
  <Flex
    flexDirection="column"
    justifyContent="space-between"
    alignItems="center"
    width="100px"
  >
    <Text fontSize="lg" fontWeight="bold">
      {value}
    </Text>

    <Text fontSize="md">{label}</Text>
  </Flex>
);
