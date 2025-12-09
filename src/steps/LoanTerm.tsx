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
                STEP 3 OF 4
            </Text>

            <Title title="Set Your Loan Amount and Term" />
            <Text color="gray.500">
                Choose how much you would like to borrow and over how long, plus any existing debt and optional credit
                score.
            </Text>

            <HStack width="100%" gap="1rem" marginTop="1rem">
                <Input placeholder="Desired Loan Amount" type="number" />
                <Input placeholder="Loan Term (Months)" type="number" />
            </HStack>

            <HStack width="100%" gap="1rem" marginTop="1rem">
                <Input placeholder="Existing Debt (Optional)" type="number" />
                <Input placeholder="Credit Score (Optional)" type="number" />
            </HStack>
        </VStack>
    );
};

export default IncomeExpenses;
