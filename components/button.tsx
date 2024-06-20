import { Button as ChakraButton, ResponsiveValue } from "@chakra-ui/react";

type Props = {
  label: string;
  bg?: string;
  labelColor?: string;
  borderRadius?: string;
  handleClick?: () => void;
  size?: ResponsiveValue<string>;
};

const Button = (props: Props) => {
  const {
    label,
    size = "md",
    handleClick,
    borderRadius,
    bg = "lightgray",
    labelColor = "white",
  } = props;

  return (
    <ChakraButton
      borderRadius={borderRadius}
      size={size}
      onClick={handleClick}
      bg={bg}
      color={labelColor}
      _hover={{ filter: "brightness(90%)" }}
    >
      {label}
    </ChakraButton>
  );
};

export default Button;
