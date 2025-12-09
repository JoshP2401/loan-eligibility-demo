import { HStack, Text } from "@chakra-ui/react";
import FormikInput from "../../../shared/form/formik/FormikInput";

const IncomeExpenses = () => {
    return (
        <>
            <Text color="gray.500">
                Choose how much you would like to borrow and over how long, plus any existing debt and optional credit
                score.
            </Text>

            <HStack width="100%" gap="1rem" marginTop="1rem">
                <FormikInput
                    name="loanAmount"
                    label="Desired Loan Amount"
                    subtitle="The amount you'd like to borrow (R5,00 - R300,000"
                    placeholder="Enter amount"
                    type="number"
                />
                <FormikInput
                    name="loanTerm"
                    label="Loan Term (Months)"
                    subtitle="Between 6 and 60 months"
                    placeholder="Enter term"
                    type="number"
                />
            </HStack>

            <HStack width="100%" gap="1rem" marginTop="1rem">
                <FormikInput
                    name="existingDebt"
                    label="Existing Debt (Optional)"
                    subtitle="Helps estimate how your current credit affects affordability."
                    placeholder="Enter debt"
                    type="number"
                />

                <FormikInput
                    name="creditScore"
                    label="Credit Score (Optional)"
                    subtitle="Used only to adjust the mocked interest rate (300-850 typical range)."
                    placeholder="Enter score"
                    type="number"
                />
            </HStack>
        </>
    );
};

export default IncomeExpenses;
