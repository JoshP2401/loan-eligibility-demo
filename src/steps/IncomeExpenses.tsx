import { HStack, Text } from "@chakra-ui/react";
import FormikInput from "../formik/FormikInput";

const IncomeExpenses = () => {
    return (
        <>
            <Text color="gray.500">We use this to estimate affordability.</Text>

            <HStack width="100%" gap="1rem" marginTop="1rem">
                <FormikInput
                    name="monthlyIncome"
                    placeholder="Monthly Income"
                    label="Monthly Income (After Tax)"
                    subtitle="Your regular take-home pay per month (minimum R5,000)."
                    type="number"
                />
                <FormikInput
                    name="monthlyExpenses"
                    placeholder="Monthly Expenses"
                    label="Monthly Expenses"
                    subtitle="Include rent, transport, food and other fixed commitments."
                    type="number"
                />
            </HStack>
        </>
    );
};

export default IncomeExpenses;
