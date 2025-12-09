import { Badge, Box, HStack, Progress, Text, VStack } from "@chakra-ui/react";
import Title from "../components/Title";

const BudgetStretchBar = () => {
    return (
        <Box w="100%" height="100%" marginTop="1rem" marginBottom="1rem">
            <Title size="xl" title="How stretched is your budget?" />

            <Progress.Root value={25} size="sm">
                <Progress.Track bg="#eee" borderRadius="full">
                    <Progress.Range bg="green.500" borderRadius="full" />
                </Progress.Track>
            </Progress.Root>

            <Text fontSize="sm" color="gray.500" marginTop="0.5rem">
                Lower percentages generally indicate a healthier level of total debt compared to your income.
            </Text>

            <Text fontSize="sm" color="gray.800" marginTop="0.5rem">
                Based on your income, expenses and requested amount, this loan looks affordable.
            </Text>
        </Box>
    );
};

type EligibilityWidgetProps = {
    title: string;
    data: string;
    subtitle: string;
};

const EligibilityWidget = (props: EligibilityWidgetProps) => {
    const { title, data, subtitle } = props;
    return (
        <VStack width="100%" alignItems="flex-start" gap="0.25rem">
            <Text color="gray.500">{title}</Text>
            <Title title={data} />
            <Text fontSize="sm" color="gray.500">
                {subtitle}
            </Text>
        </VStack>
    );
};

const Review = () => {
    return (
        <VStack
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="sm"
            padding="1rem"
            width="100%"
            height="100%"
            alignItems="flex-start"
            gap="0.5rem"
            marginTop="2rem"
            marginBottom="2rem"
        >
            <Text fontSize="sm" color="gray.500">
                STEP 4 OF 4
            </Text>

            <Title title="Review Your Results" />
            <Text color="gray.500">
                See a mocked eligibility outcome, product details, and an example interest rate and payment schedule.
            </Text>

            <HStack width="100%" justifyContent="space-between" marginTop="1rem" marginBottom="0.5rem">
                <Title size="xl" title="Eligibility Overview" />
                <Badge bgColor={"green.500"} variant="subtle" color="white">
                    Eligible
                </Badge>
            </HStack>
            <Text color="gray.500">A mocked interpretation of your inputs, not a real credit decision.</Text>

            <HStack width="100%" justifyContent="space-between" marginTop="1rem" marginBottom="1rem">
                <EligibilityWidget title="Approval Likelihood" data="90%" subtitle="Risk: Low" />
                <EligibilityWidget
                    title="Recommended Amount"
                    data="R150,000"
                    subtitle="Within your estimated affordability"
                />
                <EligibilityWidget
                    title="Debt-to-Income Ratio"
                    data="15.8%"
                    subtitle="Total debt as a share of your income"
                />
            </HStack>

            <BudgetStretchBar />
        </VStack>
    );
};

export default Review;
