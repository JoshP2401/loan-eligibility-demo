import { VStack } from "@chakra-ui/react";

const StepContainer = ({ children }: { children: React.ReactNode }) => (
    <VStack
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        boxShadow="sm"
        padding="1rem"
        width="100%"
        alignItems="flex-start"
        gap="0.5rem"
        marginBottom="2rem"
    >
        {children}
    </VStack>
);

export default StepContainer;
