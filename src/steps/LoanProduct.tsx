import { Badge, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { type FormikValues } from "formik";
import { useEffect, useState } from "react";
import { getLoanProducts } from "../api/loanApi";
import type { LoanProduct as LoanProductType } from "../types/LoanProduct";
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

const formatPurposeLabel = (purpose: string) =>
    purpose
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

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
                            {formatPurposeLabel(purpose)}
                        </Text>
                    ))}
                </HStack>
            </VStack>
        </VStack>
    );
};

const LoanProduct = ({ formik }: { formik: FormikValues }) => {
    const [products, setProducts] = useState<LoanProductType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadProducts = async () => {
            setIsLoading(true);
            try {
                const response = await getLoanProducts();
                if (isMounted) {
                    setProducts(response.products);
                }
            } catch {
                if (isMounted) {
                    setError("Failed to load loan products");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    if (isLoading && products.length === 0) {
        return <Text color="gray.500">Loading loan products...</Text>;
    }

    if (error && products.length === 0) {
        return (
            <VStack alignItems="flex-start" width="100%">
                <Text color="red.500" fontSize="sm">
                    {error}
                </Text>
                <Text color="gray.500" fontSize="sm">
                    Please try again later.
                </Text>
            </VStack>
        );
    }

    if (products.length === 0) {
        return (
            <Text color="gray.500">
                No loan products are available at the moment.
            </Text>
        );
    }

    const selectedProductId = (formik.values.loanProduct as string) || products[0]?.id;
    const selectedProduct =
        products.find((product) => product.id === selectedProductId) ?? products[0];

    const purposeOptions =
        selectedProduct?.purposes.map((purpose) => ({
            label: formatPurposeLabel(purpose),
            value: purpose,
        })) ?? [];

    const formatAmountRange = (product: LoanProductType) =>
        `R${product.minAmount.toLocaleString()} - R${product.maxAmount.toLocaleString()}`;

    const formatTermRange = (product: LoanProductType) =>
        `${product.minTerm} - ${product.maxTerm} months`;

    const formatInterestRange = (product: LoanProductType) =>
        `${product.interestRateRange.min}% - ${product.interestRateRange.max}%`;

    return (
        <>
            <Text color="gray.500">
                Select the product and purpose that best matches your need
            </Text>

            <HStack width="100%" height="100%">
                {products.map((product) => (
                    <LoanProductCard
                        key={product.id}
                        title={product.name}
                        subtitle={product.description}
                        loanAmount={formatAmountRange(product)}
                        loanTerm={formatTermRange(product)}
                        interestRate={formatInterestRange(product)}
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
