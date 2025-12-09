import { Badge, Box, HStack, Progress, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Title from "../components/Title";
import {
    checkLoanEligibility,
    calculateInterestRate,
    type LoanEligibilityRequest,
    type InterestRateCalculatorRequest,
} from "../api/loanApi";
import type { LoanEligibilityResponse } from "../types/LoanEligibility";
import type { InterestRateCalculatorResponse } from "../types/InterestRateCalculator";

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
        <Box width="100%" marginTop="1rem" marginBottom="1rem">
            <SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} gap="0.75rem">
                <EntryPairing title="Month" value={month.toString()} />
                <EntryPairing title="Payment" value={formatCurrencyInline(payment)} />
                <EntryPairing title="Principal" value={formatCurrencyInline(principal)} />
                <EntryPairing title="Interest" value={formatCurrencyInline(interest)} />
                <EntryPairing title="Balance" value={formatCurrencyInline(balance)} />
            </SimpleGrid>
        </Box>
    );
};

type BudgetStretchBarProps = {
    debtToIncomeRatio: number | null;
};

const BudgetStretchBar = ({ debtToIncomeRatio }: BudgetStretchBarProps) => {
    const value = debtToIncomeRatio ?? 0;

    return (
        <Box w="100%" height="100%" marginTop="1rem" marginBottom="1rem">
            <Title size="xl" title="How stretched is your budget?" />

            <Progress.Root value={value} size="sm">
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

const formatCurrency = (amount: number) =>
    `R${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const safeCurrency = (amount: number | null | undefined) =>
    amount != null ? formatCurrency(amount) : "-";

// Static request bodies that match LoanEligibilitySimulatorEndpoints.md
const STATIC_ELIGIBILITY_REQUEST: LoanEligibilityRequest = {
    personalInfo: {
        age: 35,
        employmentStatus: "employed",
        employmentDuration: 24,
    },
    financialInfo: {
        monthlyIncome: 25000.0,
        monthlyExpenses: 15000.0,
        existingDebt: 5000.0,
        creditScore: 650,
    },
    loanDetails: {
        requestedAmount: 150000.0,
        loanTerm: 24,
        loanPurpose: "home_improvement",
    },
};

const STATIC_RATE_REQUEST: InterestRateCalculatorRequest = {
    loanAmount: 150000.0,
    loanTerm: 24,
    creditScore: 650,
    loanType: "personal_loan",
};

const Review = () => {
    const [eligibilityResult, setEligibilityResult] = useState<LoanEligibilityResponse | null>(null);
    const [eligibilityLoading, setEligibilityLoading] = useState(false);
    const [eligibilityError, setEligibilityError] = useState<string | null>(null);

    const [rateResult, setRateResult] = useState<InterestRateCalculatorResponse | null>(null);
    const [rateLoading, setRateLoading] = useState(false);
    const [rateError, setRateError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadEligibility = async () => {
            setEligibilityLoading(true);
            setEligibilityError(null);
            try {
                const response = await checkLoanEligibility(STATIC_ELIGIBILITY_REQUEST);
                if (isMounted) {
                    setEligibilityResult(response);
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

        const loadRate = async () => {
            setRateLoading(true);
            setRateError(null);
            try {
                const response = await calculateInterestRate(STATIC_RATE_REQUEST);
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

        void loadEligibility();
        void loadRate();

        return () => {
            isMounted = false;
        };
    }, []);

    const personalInfo = STATIC_ELIGIBILITY_REQUEST.personalInfo;
    const financialInfo = STATIC_ELIGIBILITY_REQUEST.financialInfo;
    const loanDetails = STATIC_ELIGIBILITY_REQUEST.loanDetails;

    const loanType = STATIC_RATE_REQUEST.loanType;
    const employmentStatusLabel = toTitleCase(personalInfo.employmentStatus);

    const productLabel =
        loanType === "vehicle_loan"
            ? "Vehicle Finance"
            : loanType === "personal_loan" || !loanType
            ? "Personal Loan"
            : toTitleCase(loanType);

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
                Review your personal and financial details, loan request, and a mocked eligibility and rate outcome
                based entirely on the demo API specification.
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
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="1rem" marginTop="0.75rem">
                    <EntryPairing title="Age" value={String(personalInfo.age)} />
                    <EntryPairing title="Employment Status" value={employmentStatusLabel} />
                    <EntryPairing
                        title="Monthly Income"
                        value={safeCurrency(financialInfo.monthlyIncome)}
                    />
                    <EntryPairing
                        title="Monthly Expenses"
                        value={safeCurrency(financialInfo.monthlyExpenses)}
                    />
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="1rem" marginTop="0.75rem">
                    <EntryPairing
                        title="Existing Debt"
                        value={safeCurrency(financialInfo.existingDebt)}
                    />
                    <EntryPairing
                        title="Credit Score"
                        value={String(financialInfo.creditScore)}
                    />
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
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="1rem" marginTop="0.75rem">
                    <EntryPairing title="Product" value={productLabel} />
                    <EntryPairing
                        title="Purpose"
                        value={toTitleCase(loanDetails.loanPurpose)}
                    />
                    <EntryPairing
                        title="Requested Amount"
                        value={safeCurrency(loanDetails.requestedAmount)}
                    />
                    <EntryPairing
                        title="Loan Term (months)"
                        value={String(loanDetails.loanTerm)}
                    />
                </SimpleGrid>
            </Box>

            <HStack width="100%" justifyContent="space-between" marginTop="1.5rem" marginBottom="0.5rem">
                <Title size="xl" title="Eligibility Overview" />
                <Badge bgColor={"green.500"} variant="subtle" color="white">
                    {eligibilityResult?.eligibilityResult.isEligible ? "Eligible" : "Not Eligible"}
                </Badge>
            </HStack>
            <Text color="gray.500">
                A mocked interpretation of your inputs, not a real credit decision.
            </Text>

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

            {eligibilityResult && (
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
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap="1rem">
                            <EligibilityWidget
                                title="Approval Likelihood"
                                data={`${eligibilityResult.eligibilityResult.approvalLikelihood}%`}
                                subtitle={`Risk: ${toTitleCase(
                                    eligibilityResult.eligibilityResult.riskCategory,
                                )}`}
                            />
                            <EligibilityWidget
                                title="Recommended Amount"
                                data={safeCurrency(eligibilityResult.recommendedLoan.recommendedAmount)}
                                subtitle={`Max Amount: ${safeCurrency(
                                    eligibilityResult.recommendedLoan.maxAmount,
                                )}`}
                            />
                            <EligibilityWidget
                                title="Debt-to-Income Ratio"
                                data={`${eligibilityResult.affordabilityAnalysis.debtToIncomeRatio.toFixed(
                                    1,
                                )}%`}
                                subtitle="Total debt as a share of your income"
                            />
                        </SimpleGrid>
                    </Box>

                    <BudgetStretchBar
                        debtToIncomeRatio={eligibilityResult.affordabilityAnalysis.debtToIncomeRatio}
                    />
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
                    Based on the loan product you chose and the information entered above, this
                    calculates a mocked rate and early repayment view.
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
                            <SimpleGrid columns={{ base: 1, md: 3 }} gap="1rem">
                                <EligibilityWidget
                                    title="Estimated Rate"
                                    data={`${rateResult.interestRate.toFixed(2)}%`}
                                    subtitle="Mocked interest rate"
                                />
                                <EligibilityWidget
                                    title="Est. Monthly Payment"
                                    data={safeCurrency(rateResult.monthlyPayment)}
                                    subtitle="Based on your requested term"
                                />
                                <EligibilityWidget
                                    title="Total Repayment"
                                    data={safeCurrency(rateResult.totalRepayment)}
                                    subtitle={`Total Interest: ${safeCurrency(
                                        rateResult.totalInterest,
                                    )}`}
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
                            <Title size="xl" title="Payment Schedule Preview" />
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
