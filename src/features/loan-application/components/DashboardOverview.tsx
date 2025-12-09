import { VStack } from "@chakra-ui/react";
import { type FormikValues } from "formik";
import IncomeExpenses from "../steps/IncomeExpenses";
import LoanProduct from "../steps/LoanProduct";
import LoanTerm from "../steps/LoanTerm";
import Review from "../steps/Review";
import DashboardHeader from "./DashboardHeader";
import FormWizard from "./LoanWizard";
import {
    loanProductStepSchema,
    incomeExpensesStepSchema,
    loanDetailsStepSchema,
    fullLoanApplicationSchema,
} from "../validation/loanValidation";
import { checkLoanEligibility, type LoanEligibilityRequest } from "../api/loanApi";

const DashboardOverview = () => {
    const initialValues = {
        loanProduct: "personal_loan",
        loanPurpose: "",
        age: "",
        employmentStatus: "",
        monthlyIncome: "",
        monthlyExpenses: "",
        loanAmount: "",
        loanTerm: "",
        existingDebt: "",
        creditScore: "",
    };

    const handleSubmit = async (values: FormikValues) => {
        const age = values.age ? Number(values.age) : 35;
        const employmentStatus = (values.employmentStatus as string) || "employed";

        const monthlyIncome = Number(values.monthlyIncome ?? 0);
        const monthlyExpenses = Number(values.monthlyExpenses ?? 0);
        const existingDebt = Number(values.existingDebt ?? 0);
        const creditScore = values.creditScore ? Number(values.creditScore) : 650;

        const requestedAmount = Number(values.loanAmount ?? 0);
        const loanTerm = Number(values.loanTerm ?? 0);
        const loanPurpose = (values.loanPurpose as string) || "home_improvement";

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

        const eligibilityResponse = await checkLoanEligibility(payload);

        // For now, log the full flow; this can later drive the Review UI.
        console.log("Loan Application Submitted:", {
            formValues: values,
            eligibilityPayload: payload,
            eligibilityResponse,
        });
    };

    const steps = [
        {
            component: (formik: FormikValues) => <LoanProduct formik={formik} />,
            validationSchema: loanProductStepSchema,
            title: "Choose Loan Product",
        },
        {
            component: () => <IncomeExpenses />,
            validationSchema: incomeExpensesStepSchema,
            title: "Income & Expenses",
        },
        {
            component: () => <LoanTerm />,
            validationSchema: loanDetailsStepSchema,
            title: "Loan Details",
        },
        {
            component: () => <Review />,
            validationSchema: fullLoanApplicationSchema,
            title: "Review",
        },
    ];

    return (
        <VStack
            margin="1rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="8px"
            boxShadow="sm"
            height="100%"
            paddingInline="2rem"
            pt="2rem"
        >
            <DashboardHeader />
            <FormWizard steps={steps} initialValues={initialValues} onSubmit={handleSubmit} />
        </VStack>
    );
};

export default DashboardOverview;
