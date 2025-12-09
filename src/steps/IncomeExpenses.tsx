import { HStack, Input, Text, VStack } from "@chakra-ui/react";
import Title from "../components/Title";

const IncomeExpenses = () => {
    return (
        <VStack
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="sm"
            padding="1rem"
            width="100%"
            alignItems="flex-start"
            gap="0.5rem"
            marginTop="2rem"
            marginBottom="2rem"
        >
            <Text fontSize="sm" color="gray.500">
                STEP 2 OF 4
            </Text>

            <Title title="Tell us about your Income and Expenses" />
            <Text color="gray.500">This is used to estimate affordability and eligibility.</Text>

            <HStack width="100%" gap="1rem" marginTop="1rem">
                <Input placeholder="Monthly Income" type="number" />
                <Input placeholder="Monthly Expenses" type="number" />
            </HStack>
        </VStack>
    );
};

export default IncomeExpenses;
