import { VStack } from "@chakra-ui/react";
import { type FormikValues } from "formik";
import IncomeExpenses from "../steps/IncomeExpenses";
import LoanProduct from "../steps/LoanProduct";
import LoanTerm from "../steps/LoanTerm";
import Review from "../steps/Review";
import DashboardHeader from "./DashboardHeader";
import FormWizard from "./LoanWizard";

const DashboardOverview = () => {
    const initialValues = {
        loanProduct: "PERSONAL",
        loanPurpose: "",
        monthlyIncome: "",
        monthlyExpenses: "",
        loanAmount: "",
        loanTerm: "",
        existingDebt: "",
        creditScore: "",
    };

    const handleSubmit = (values: Record<string, unknown>) => {
        console.log("Loan Application Submitted:", values);
    };

    const steps = [
        {
            component: (formik: FormikValues) => <LoanProduct formik={formik} />,
            validationSchema: "",
            title: "Choose Loan Product",
        },
        {
            component: () => <IncomeExpenses />,
            validationSchema: "",
            title: "Income & Expenses",
        },
        {
            component: () => <LoanTerm />,
            validationSchema: "",
            title: "Loan Details",
        },
        {
            component: () => <Review />,
            validationSchema: "",
            title: "Review",
        },
    ];

    return (
        <VStack width="100%" height="100%" pt="2rem" paddingInline="2rem">
            <DashboardHeader />
            <FormWizard steps={steps} initialValues={initialValues} onSubmit={handleSubmit} />
        </VStack>
    );
};

export default DashboardOverview;
