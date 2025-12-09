import { VStack } from "@chakra-ui/react";
import DashboardHeader from "./DashboardHeader";
import DashboardSteps from "./DashboardSteps";
import LoanProduct from "../steps/LoanProduct";
import IncomeExpenses from "../steps/IncomeExpenses";
import LoanTerm from "../steps/LoanTerm";
import Review from "../steps/Review";

const DashboardOverview = () => {
    return (
        <VStack width="100%" height="100%" pt="2rem" paddingInline="2rem">
            <DashboardHeader />
            <DashboardSteps />
            <LoanProduct />
            <IncomeExpenses />
            <LoanTerm />
            <Review />
        </VStack>
    );
};

export default DashboardOverview;
