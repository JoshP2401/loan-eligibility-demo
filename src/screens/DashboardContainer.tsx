import { Box } from "@chakra-ui/react";

type DashboardContainerProps = {
    children: React.ReactNode;
};

const DashboardContainer = ({ children }: DashboardContainerProps) => {
    return (
        <Box
            margin="1rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="8px"
            boxShadow="md"
            height="100%"
        >
            {children}
        </Box>
    );
};

export default DashboardContainer;
