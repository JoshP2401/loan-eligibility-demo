import { Text, VStack } from "@chakra-ui/react";
import Title from "./Title";

const DashboardHeader = () => {
    return (
        <VStack display="flex" width="100%" justifyContent="left" alignItems="left" gap={6}>
            <Title title="Loan Eligibility Calculator" size="3xl" color="orange.500" />
            <Text alignContent="left" color="gray.600">
                Welcome to the Loan Eligibility Calculator. This tool helps you determine your eligibility for various
                loan options based on your financial information.
            </Text>
        </VStack>
    );
};

export default DashboardHeader;
