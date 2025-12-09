import { Badge, Box, HStack, Progress, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { FormikValues } from "formik";
import Title from "../components/Title";
import {
    checkLoanEligibility,
    calculateInterestRate,
    type LoanEligibilityRequest,
    type InterestRateCalculatorRequest,
} from "../api/loanApi";
import type { LoanEligibilityResponse } from "../types/LoanEligibility";
import type { InterestRateCalculatorResponse } from "../types/InterestRateCalculator";

type ReviewProps = {
    formik: FormikValues;
};

type EntryPairingProps = {
    title: string;
    value: string;
};

const toTitleCase = (value: string): string =>
    value
        .split(/[_\s]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");

const EntryPairing = ({ title, value }: EntryPairingProps) => (
    <Box
        width="100%"
        borderRadius="md"
        border="1px solid"
        borderColor="gray.200"
        padding="0.75rem"
        bg="white"
    >
        <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="0.03em">
            {title}
        </Text>
        <Text fontSize="lg" fontWeight="semibold" color="gray.800" marginTop="0.25rem">
            {value}
        </Text>
    </Box>
);

type PaymentScheduleEntryProps = {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
};

const formatCurrencyInline = (amount: number) =>
    `R${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const PaymentScheduleEntry = (props: PaymentScheduleEntryProps) => {
    const { month, payment, principal, interest, balance } = props;

    return (
        <HStack width="100%" justifyContent="space-between" marginTop="1rem" marginBottom="1rem">
            <EntryPairing title="Month" value={month.toString()} />
            <EntryPairing title="Payment" value={formatCurrencyInline(payment)} />
            <EntryPairing title="Principal" value={formatCurrencyInline(principal)} />
            <EntryPairing title="Interest" value={formatCurrencyInline(interest)} />
            <EntryPairing title="Balance" value={formatCurrencyInline(balance)} />
        </HStack>
    );
};

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

const Review = ({ formik }: ReviewProps) => {
    const { values } = formik;

    const [eligibility, setEligibility] = useState<LoanEligibilityResponse | null>(null);
    const [eligibilityLoading, setEligibilityLoading] = useState(false);
    const [eligibilityError, setEligibilityError] = useState<string | null>(null);

    const [rateResult, setRateResult] = useState<InterestRateCalculatorResponse | null>(null);
    const [rateLoading, setRateLoading] = useState(false);
    const [rateError, setRateError] = useState<string | null>(null);

    const age = values.age ? Number(values.age) : 35;
    const employmentStatus = (values.employmentStatus as string) || "Employed";

    const monthlyIncome = Number(values.monthlyIncome ?? 0);
    const monthlyExpenses = Number(values.monthlyExpenses ?? 0);
    const existingDebt = Number(values.existingDebt ?? 0);
    const creditScore = values.creditScore ? Number(values.creditScore) : 650;

    const requestedAmount = Number(values.loanAmount ?? 0) || 150000;
    const loanTerm = Number(values.loanTerm ?? 0) || 24;
    const loanPurpose = (values.loanPurpose as string) || "home_improvement";
    const loanProduct = (values.loanProduct as string) || "personal_loan";

    useEffect(() => {
        const payload: LoanEligibilityRequest = {
            personalInfo: {
                age,
                employmentStatus,
                employmentDuration: 24,
            },
            financialInfo: {
                monthlyIncome,
                monthlyExpenses,
                existingDebt,
                creditScore,
            },
            loanDetails: {
                requestedAmount,
                loanTerm,
                loanPurpose,
            },
        };

        let isMounted = true;

        const loadEligibility = async () => {
            setEligibilityLoading(true);
            setEligibilityError(null);

            try {
                const response = await checkLoanEligibility(payload);
                if (isMounted) {
                    setEligibility(response);
                }
            } catch {
                if (isMounted) {
                    setEligibilityError("Unable to load eligibility result.");
                }
            } finally {
                if (isMounted) {
                    setEligibilityLoading(false);
                }
            }
        };

        void loadEligibility();

        return () => {
            isMounted = false;
        };
    }, [
        age,
        employmentStatus,
        monthlyIncome,
        monthlyExpenses,
        existingDebt,
        creditScore,
        requestedAmount,
        loanTerm,
        loanPurpose,
    ]);

    useEffect(() => {
        const ratePayload: InterestRateCalculatorRequest = {
            loanAmount: requestedAmount,
            loanTerm,
            creditScore,
            loanType: loanProduct,
        };

        let isMounted = true;

        const loadRate = async () => {
            setRateLoading(true);
            setRateError(null);

            try {
                const response = await calculateInterestRate(ratePayload);
                if (isMounted) {
                    setRateResult(response);
                }
            } catch {
                if (isMounted) {
                    setRateError("Unable to load interest rate details.");
                }
            } finally {
                if (isMounted) {
                    setRateLoading(false);
                }
            }
        };

        void loadRate();

        return () => {
            isMounted = false;
        };
    }, [requestedAmount, loanTerm, creditScore, loanProduct]);

    const formatCurrency = (amount: number) =>
        `R${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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
                Review your personal and financial details, loan request, and a mocked eligibility and rate outcome based on the demo
                API.
            </Text>

            <Box
                width="100%"
                marginTop="1rem"
                padding="1rem"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                bg="gray.50"
            >
                <Title size="xl" title="Personal & Financial Details" />
                <SimpleGrid
                    columns={{ base: 1, sm: 2, lg: 4 }}
                    gap="1rem"
                    marginTop="0.75rem"
                >
                    <EntryPairing title="Age" value={values.age ? String(values.age) : "35"} />
                    <EntryPairing title="Employment Status" value={toTitleCase(employmentStatus)} />
                    <EntryPairing title="Monthly Income" value={formatCurrency(monthlyIncome || 25000)} />
                    <EntryPairing title="Monthly Expenses" value={formatCurrency(monthlyExpenses || 15000)} />
                </SimpleGrid>
                <SimpleGrid
                    columns={{ base: 1, sm: 2, lg: 4 }}
                    gap="1rem"
                    marginTop="0.75rem"
                >
                    <EntryPairing title="Existing Debt" value={formatCurrency(existingDebt || 5000)} />
                    <EntryPairing title="Credit Score" value={String(creditScore || 650)} />
                </SimpleGrid>
            </Box>

            <Box
                width="100%"
                marginTop="1.5rem"
                padding="1rem"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                bg="gray.50"
            >
                <Title size="xl" title="Loan Details" />
                <SimpleGrid
                    columns={{ base: 1, sm: 2, lg: 4 }}
                    gap="1rem"
                    marginTop="0.75rem"
                >
                    <EntryPairing
                        title="Product"
                        value={loanProduct === "vehicle_loan" ? "Vehicle Finance" : "Personal Loan"}
                    />
                    <EntryPairing title="Purpose" value={toTitleCase(loanPurpose)} />
                    <EntryPairing title="Requested Amount" value={formatCurrency(requestedAmount)} />
                    <EntryPairing title="Loan Term (months)" value={String(loanTerm)} />
                </SimpleGrid>
            </Box>

            <HStack width="100%" justifyContent="space-between" marginTop="1.5rem" marginBottom="0.5rem">
                <Title size="xl" title="Eligibility Overview" />
                <Badge bgColor={"green.500"} variant="subtle" color="white">
                    {eligibility?.eligibilityResult.isEligible ? "Eligible" : "Not Eligible"}
                </Badge>
            </HStack>
            <Text color="gray.500">A mocked interpretation of your inputs, not a real credit decision.</Text>

            {eligibilityLoading && (
                <Text color="gray.500" fontSize="sm">
                    Loading eligibility result...
                </Text>
            )}

            {eligibilityError && (
                <Text color="red.500" fontSize="sm">
                    {eligibilityError}
                </Text>
            )}

            {eligibility && (
                <>
                    <Box
                        width="100%"
                        marginTop="1rem"
                        marginBottom="1rem"
                        padding="1rem"
                        borderRadius="md"
                        border="1px solid"
                        borderColor="gray.200"
                        bg="gray.50"
                    >
                        <SimpleGrid
                            columns={{ base: 1, md: 3 }}
                            gap="1rem"
                        >
                            <EligibilityWidget
                                title="Approval Likelihood"
                                data={`${eligibility.eligibilityResult.approvalLikelihood}%`}
                                subtitle={`Risk: ${toTitleCase(eligibility.eligibilityResult.riskCategory)}`}
                            />
                            <EligibilityWidget
                                title="Recommended Amount"
                                data={formatCurrency(eligibility.recommendedLoan.recommendedAmount)}
                                subtitle={`Max Amount: ${formatCurrency(eligibility.recommendedLoan.maxAmount)}`}
                            />
                            <EligibilityWidget
                                title="Debt-to-Income Ratio"
                                data={`${eligibility.affordabilityAnalysis.debtToIncomeRatio.toFixed(1)}%`}
                                subtitle="Total debt as a share of your income"
                            />
                        </SimpleGrid>
                    </Box>

                    <BudgetStretchBar />
                </>
            )}

            <VStack
                w="100%"
                height="100%"
                marginTop="1rem"
                marginBottom="1rem"
                gap="1rem"
                justify="left"
                alignItems="flex-start"
            >
                <Title size="xl" title="Selected Product & Rate Preview" />
                <Text color="gray.500">
                    Based on the loan product you chose and the information entered above, this calculates a mocked rate and early
                    repayment view.
                </Text>

                {rateLoading && (
                    <Text fontSize="sm" color="gray.500" marginTop="0.5rem">
                        Loading rate and payment details...
                    </Text>
                )}

                {rateError && (
                    <Text fontSize="sm" color="red.500" marginTop="0.5rem">
                        {rateError}
                    </Text>
                )}

                {rateResult && (
                    <>
                        <Text fontSize="sm" color="gray.800" marginTop="0.5rem">
                            Based on your income, expenses and requested amount, this loan looks affordable.
                        </Text>

                        <Box
                            width="100%"
                            padding="1rem"
                            borderRadius="md"
                            border="1px solid"
                            borderColor="gray.200"
                            bg="gray.50"
                        >
                            <SimpleGrid
                                columns={{ base: 1, md: 3 }}
                                gap="1rem"
                            >
                                <EligibilityWidget
                                    title="Estimated Rate"
                                    data={`${rateResult.interestRate.toFixed(2)}%`}
                                    subtitle="Mocked interest rate"
                                />
                                <EligibilityWidget
                                    title="Est. Monthly Payment"
                                    data={formatCurrency(rateResult.monthlyPayment)}
                                    subtitle="Based on your requested term"
                                />
                                <EligibilityWidget
                                    title="Total Repayment"
                                    data={formatCurrency(rateResult.totalRepayment)}
                                    subtitle={`Total Interest: ${formatCurrency(rateResult.totalInterest)}`}
                                />
                            </SimpleGrid>
                        </Box>

                        <VStack
                            w="100%"
                            height="100%"
                            marginTop="1rem"
                            marginBottom="1rem"
                            gap="1rem"
                            justify="left"
                            alignItems="flex-start"
                        >
                            <Title size="xl" title="Payment Schedule preview" />
                            <Text color="gray.500">
                                This is an example of how your monthly payments will be structured.
                            </Text>

                            {rateResult.paymentSchedule.map((entry) => (
                                <PaymentScheduleEntry
                                    key={entry.month}
                                    month={entry.month}
                                    payment={entry.payment}
                                    principal={entry.principal}
                                    interest={entry.interest}
                                    balance={entry.balance}
                                />
                            ))}
                        </VStack>
                    </>
                )}
            </VStack>
        </VStack>
    );
};

export default Review;
