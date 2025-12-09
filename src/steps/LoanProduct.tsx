import { Badge, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { type FormikValues } from "formik";
import FormikSelect from "../formik/FormikSelect";
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
    title: string;
    subtitle: string;
    loanAmount: string;
    loanTerm: string;
    interestRate: string;
    purposes: string[];
    isSelected?: boolean;
    onSelect: () => void;
};

const LoanProductCard = (props: LoanProductCardProps) => {
    const { isSelected = false, title, subtitle, loanAmount, loanTerm, interestRate, purposes, onSelect } = props;
    return (
        <VStack
            width="100%"
            height="100%"
            alignItems="flex-start"
            gap="0.5rem"
            marginTop="2rem"
            marginBottom="2rem"
            border="1px solid"
            borderColor={isSelected ? "orange.500" : "gray.200"}
            borderRadius="md"
            bgColor={isSelected ? "orange.50" : "gray.50"}
            padding="1rem"
            cursor="pointer"
            onClick={onSelect}
        >
            <Flex width="100%" alignItems="center" justifyContent="space-between">
                <Title title={title} />
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

            <Text color="gray.500">{subtitle}</Text>

            <CardData title="Interest Rate" data={interestRate} />
            <CardData title="Loan Amount" data={loanAmount} />
            <CardData title="Repayment Term" data={loanTerm} />

            <VStack alignItems="flex-start" gap="0">
                <Text fontSize="xs" color="gray.500">
                    Purposes
                </Text>
                <HStack width="100%">
                    {purposes.map((purpose, index) => (
                        <Text
                            key={index}
                            paddingInline=".5rem"
                            borderRadius="0.5rem"
                            paddingBlock="0.25rem"
                            bgColor="gray.100"
                            fontSize="sm"
                            fontWeight="bold"
                        >
                            {purpose}
                        </Text>
                    ))}
                </HStack>
            </VStack>
        </VStack>
    );
};

const LoanProduct = ({ formik }: { formik: FormikValues }) => {
    const products = [
        {
            id: "PERSONAL",
            title: "Personal Loan",
            subtitle: "Flexible personal financing for various needs.",
            loanAmount: "R5,000 - R300,000",
            loanTerm: "6 - 60 months",
            interestRate: "10.5% - 18.5%",
            purposes: ["Personal", "Home Improvement", "Debt Consolidation"],
        },
        {
            id: "VEHICLE",
            title: "Vehicle Finance",
            subtitle: "Financing for new and used vehicles.",
            loanAmount: "R50,000 - R1,500,000",
            loanTerm: "12 - 72 months",
            interestRate: "8.5% - 15.0%",
            purposes: ["New Vehicle", "Used Vehicle"],
        },
    ];

    const selectedProductId = (formik.values.loanProduct as string) || products[0]?.id;
    const selectedProduct = products.find((product) => product.id === selectedProductId) ?? products[0];

    const purposeOptions =
        selectedProduct?.purposes.map((purpose) => ({
            label: purpose,
            value: purpose,
        })) ?? [];

    return (
        <>
            <Text color="gray.500">Select the product and purpose that best matches your need</Text>

            <HStack width="100%" height="100%">
                {products.map((product) => (
                    <LoanProductCard
                        key={product.id}
                        title={product.title}
                        subtitle={product.subtitle}
                        loanAmount={product.loanAmount}
                        loanTerm={product.loanTerm}
                        interestRate={product.interestRate}
                        purposes={product.purposes}
                        isSelected={product.id === selectedProductId}
                        onSelect={() => {
                            formik.setFieldValue("loanProduct", product.id);
                            if (formik.values.loanPurpose) {
                                formik.setFieldValue("loanPurpose", "");
                            }
                        }}
                    />
                ))}
            </HStack>

            <FormikSelect
                name="loanPurpose"
                label="Loan Purpose"
                placeholder="Select a purpose"
                options={purposeOptions}
            />
        </>
    );
};

export default LoanProduct;
