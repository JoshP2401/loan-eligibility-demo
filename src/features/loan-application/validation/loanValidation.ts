import * as Yup from "yup";

/* Centralised numeric limits derived from LoanEligibilitySimulatorEndpoints.md
and ValidationRules types. All validation rules should use these constants. */
export const LOAN_LIMITS = {
    age: { min: 18, max: 65 },
    employmentDuration: { min: 3 },
    income: { min: 5000 }, // Monthly income
    expenses: { min: 0 },
    creditScore: { min: 300, max: 850 },
    requestedAmount: { min: 5000, max: 300000 },
    loanTerm: { min: 6, max: 60 }, // Months
};

const formatAmount = (amount: number): string =>
    `R${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatNumber = (value: number): string => value.toLocaleString("en-ZA");

/* Shape of the full loan application form values used across steps.
 This mirrors the initialValues in DashboardOverview. */

export type LoanApplicationValues = {
    loanProduct: string;
    loanPurpose: string;
    age: string | number;
    employmentStatus: string;
    monthlyIncome: string | number;
    monthlyExpenses: string | number;
    loanAmount: string | number;
    loanTerm: string | number;
    existingDebt: string | number;
    creditScore: string | number;
};

/*
Common field schemas reused across step-specific and full schemas.
 */
const ageSchema = Yup.number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(LOAN_LIMITS.age.min, `Age must be at least ${formatNumber(LOAN_LIMITS.age.min)}`)
    .max(LOAN_LIMITS.age.max, `Age cannot be more than ${formatNumber(LOAN_LIMITS.age.max)}`);

const employmentStatusSchema = Yup.string()
    .required("Employment status is required")
    .oneOf(["employed", "self_employed", "unemployed", "retired"], "Please select a valid employment status");

const monthlyIncomeSchema = Yup.number()
    .typeError("Monthly income must be a number")
    .required("Monthly income is required")
    .min(LOAN_LIMITS.income.min, `Monthly income must be at least ${formatAmount(LOAN_LIMITS.income.min)}`);

const monthlyExpensesSchema = Yup.number()
    .typeError("Monthly expenses must be a number")
    .required("Please add your expenses before continuing")
    .min(LOAN_LIMITS.expenses.min, "Monthly expenses cannot be negative");

const existingDebtSchema = Yup.number()
    .typeError("Existing debt must be a number")
    .min(0, "Existing debt cannot be negative")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" || originalValue === null ? null : value));

const creditScoreSchema = Yup.number()
    .typeError("Credit score must be a number")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" || originalValue === null ? null : value))
    .min(LOAN_LIMITS.creditScore.min, `Credit score must be at least ${formatNumber(LOAN_LIMITS.creditScore.min)}`)
    .max(LOAN_LIMITS.creditScore.max, `Credit score cannot exceed ${formatNumber(LOAN_LIMITS.creditScore.max)}`);

const loanAmountSchema = Yup.number()
    .typeError("Loan amount must be a number")
    .required("Loan amount is required")
    .min(
        LOAN_LIMITS.requestedAmount.min,
        `Loan amount must be at least ${formatAmount(LOAN_LIMITS.requestedAmount.min)}`
    )
    .max(LOAN_LIMITS.requestedAmount.max, `Loan amount cannot exceed ${formatAmount(LOAN_LIMITS.requestedAmount.max)}`);

const loanTermSchema = Yup.number()
    .typeError("Loan term must be a number of months")
    .required("Loan term is required")
    .integer("Loan term must be a whole number of months")
    .min(LOAN_LIMITS.loanTerm.min, `Loan term must be at least ${formatNumber(LOAN_LIMITS.loanTerm.min)} months`)
    .max(LOAN_LIMITS.loanTerm.max, `Loan term cannot exceed ${formatNumber(LOAN_LIMITS.loanTerm.max)} months`);

const loanProductSchemaBase = Yup.string()
    .required("Please select a loan product")
    .oneOf(["personal_loan", "vehicle_loan"], "Please select a valid loan product");

const loanPurposeSchemaBase = Yup.string().required("Please select a loan purpose");

/* Additional cross-field rule for income vs expenses.
 Applied in schemas that include both fields.
 */
const incomeExpensesShape = {
    monthlyIncome: monthlyIncomeSchema,
    monthlyExpenses: monthlyExpensesSchema,
};

/*
Step-specific schemas, all built from the same rule set above.
 */

export const loanProductStepSchema = Yup.object({
    loanProduct: loanProductSchemaBase,
    loanPurpose: loanPurposeSchemaBase,
}) as Yup.ObjectSchema<Partial<LoanApplicationValues>>;

export const incomeExpensesStepSchema = Yup.object({
    age: ageSchema,
    employmentStatus: employmentStatusSchema,
    ...incomeExpensesShape,
    existingDebt: existingDebtSchema,
}) as Yup.ObjectSchema<Partial<LoanApplicationValues>>;

export const loanDetailsStepSchema = Yup.object({
    loanAmount: loanAmountSchema,
    loanTerm: loanTermSchema,
    creditScore: creditScoreSchema,
}) as Yup.ObjectSchema<Partial<LoanApplicationValues>>;

/*
 Full schema that can be used on submit / Review step to ensure
 all fields are valid together.
 */
export const fullLoanApplicationSchema = Yup.object({
    loanProduct: loanProductSchemaBase,
    loanPurpose: loanPurposeSchemaBase,
    age: ageSchema,
    employmentStatus: employmentStatusSchema,
    ...incomeExpensesShape,
    existingDebt: existingDebtSchema,
    loanAmount: loanAmountSchema,
    loanTerm: loanTermSchema,
    creditScore: creditScoreSchema,
}) as Yup.ObjectSchema<LoanApplicationValues>;
