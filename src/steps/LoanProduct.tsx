import { Badge, Flex, Text, VStack } from "@chakra-ui/react";
import Title from "../components/Title";

type CardDataProps = {
    title: string;
    data: string;
};

const CardData = (props: CardDataProps) => {
    const { title, data } = props;

    return (
        <VStack alignItems="flex-start" gap="0">
            <Text fontSize="xs" color="gray.500">
                {title}
            </Text>
            <Text fontSize="sm" fontWeight="bold">
                {data}
            </Text>
        </VStack>
    );
};

type LoanProductCardProps = {
    isSelected?: boolean;
};

const LoanProductCard = (props: LoanProductCardProps) => {
    const { isSelected = false } = props;
    return (
        <VStack
            width="100%"
            alignItems="flex-start"
            gap="0.5rem"
            marginTop="2rem"
            marginBottom="2rem"
            border="1px solid"
            borderColor={isSelected ? "orange.500" : "gray.200"}
            borderRadius="md"
            bgColor={isSelected ? "orange.50" : "gray.50"}
            padding="1rem"
        >
            <Flex width="100%" alignItems="center" justifyContent="space-between">
                <Title title="Personal Loan" />
                {isSelected && (
                    <Badge
                        bgColor={"orange.500"}
                        variant="subtle"
                        color="white"
                        fontSize="0.8rem"
                        paddingInline="0.5rem"
                        paddingBlock="0.25rem"
                    >
                        Selected
                    </Badge>
                )}
            </Flex>

            <Text color="gray.500">Flexible personal financing for various needs.</Text>

            <CardData title="Interest Rate" data="10.5% - 18.5%" />
            <CardData title="Loan Amount" data="R5,000 - R300,000" />
            <CardData title="Repayment Term" data="6 - 60 months" />
            <CardData title="Loan Type" data="Personal" />
        </VStack>
    );
};

const LoanProduct = () => {
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
                STEP 1 OF 4
            </Text>

            <Title title="Choose your loan product" />
            <Text color="gray.500">Select the product and purpose that best matches your need</Text>

            <LoanProductCard isSelected />
        </VStack>
    );
};

export default LoanProduct;
