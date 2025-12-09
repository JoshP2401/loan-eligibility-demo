import { Heading } from "@chakra-ui/react";

type PropTypes = {
    title: string;
    hoverable?: boolean;
    color?: "orange.500" | "gray.500" | "black";
    size?: "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
};

const Title = (props: PropTypes) => {
    const { title, size = "xl", color = "black", hoverable = false } = props;
    return (
        <Heading
            fontSize={size}
            color={color}
            fontWeight="bold"
            _hover={
                hoverable
                    ? {
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          transform: "scale(1.05)",
                          textDecoration: "underline",
                          color: { "orange.500": "orange.600", "gray.500": "gray.600", black: "gray.800" }[color],
                      }
                    : undefined
            }
        >
            {title}
        </Heading>
    );
};

export default Title;
