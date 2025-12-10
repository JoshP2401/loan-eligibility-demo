import { HStack, Text } from "@chakra-ui/react";
import FormikInput from "../../../shared/form/formik/FormikInput";
import FormikSelect from "../../../shared/form/formik/FormikSelect";

const employmentStatusOptions = [
    { label: "Employed", value: "employed" },
    { label: "Self-employed", value: "self_employed" },
    { label: "Unemployed", value: "unemployed" },
    { label: "Retired", value: "retired" },
];

const IncomeExpenses = () => {
    return (
        <>
            <Text color="gray.500">We use this to estimate affordability.</Text>

            <HStack width="100%" gap="1rem" marginTop="1rem">
                <FormikInput
                    name="age"
                    placeholder="Age"
                    label="Age"
                    subtitle="Your age in years."
                    type="number"
                />
                <FormikSelect
                    name="employmentStatus"
                    label="Employment Status"
                    placeholder="Select your employment status"
                    subtitle="Current employment status."
                    options={employmentStatusOptions}
                />
            </HStack>

            <HStack width="100%" gap="1rem" marginTop="1rem">
                <FormikInput
                    name="monthlyIncome"
                    placeholder="0.00"
                    label="Monthly Income (After Tax)"
                    subtitle="Your regular take-home pay per month (minimum R5,000)."
                    type="number"
                    prefix="R"
                />
                <FormikInput
                    name="monthlyExpenses"
                    placeholder="0.00"
                    label="Monthly Expenses"
                    subtitle="Include rent, transport, food and other fixed commitments."
                    type="number"
                    prefix="R"
                />
            </HStack>
        </>
    );
};

export default IncomeExpenses;
