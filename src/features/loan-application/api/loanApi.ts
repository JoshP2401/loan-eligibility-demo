import type { InterestRateCalculatorResponse } from "../../types/InterestRateCalculator";
import type { LoanEligibilityResponse } from "../../types/LoanEligibility";
import type { LoanProductsResponse } from "../../types/LoanProduct";
import type { ValidationRulesResponse } from "../../types/ValidationRules";

/**
 * Request payload for the mocked loan eligibility endpoint.
 * Mirrors the structure in LoanEligibilitySimulatorEndpoints.md.
 */
export type LoanEligibilityRequest = {
  personalInfo: {
    age: number;
    employmentStatus: string;
    employmentDuration: number;
  };
  financialInfo: {
    monthlyIncome: number;
    monthlyExpenses: number;
    existingDebt: number;
    creditScore: number;
  };
  loanDetails: {
    requestedAmount: number;
    loanTerm: number;
    loanPurpose: string;
  };
};

/**
 * Request payload for the mocked interest rate calculator endpoint.
 */
export type InterestRateCalculatorRequest = {
  loanAmount: number;
  loanTerm: number;
  creditScore: number;
  loanType: string; // e.g. "personal_loan" | "vehicle_loan"
};

/**
 * Small helper to simulate network latency.
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock implementation of:
 *   GET /api/loans/products
 *
 * Returns static products matching LoanEligibilitySimulatorEndpoints.md.
 * This is Option 1: in-memory mocked data with realistic API shapes.
 */
export async function getLoanProducts(): Promise<LoanProductsResponse> {
  await delay(300);

  return {
    products: [
      {
        id: "personal_loan",
        name: "Personal Loan",
        description: "Flexible personal financing for various needs",
        minAmount: 5000.0,
        maxAmount: 300000.0,
        minTerm: 6,
        maxTerm: 60,
        interestRateRange: {
          min: 10.5,
          max: 18.5,
        },
        purposes: [
          "debt_consolidation",
          "home_improvement",
          "education",
          "medical",
          "other",
        ],
      },
      {
        id: "vehicle_loan",
        name: "Vehicle Finance",
        description: "Financing for new and used vehicles",
        minAmount: 50000.0,
        maxAmount: 1500000.0,
        minTerm: 12,
        maxTerm: 72,
        interestRateRange: {
          min: 8.5,
          max: 15.0,
        },
        purposes: ["new_vehicle", "used_vehicle"],
      },
    ],
  };
}

/**
 * Mock implementation of:
 *   POST /api/loans/eligibility
 *
 * Returns the exact static example from LoanEligibilitySimulatorEndpoints.md.
 */
export async function checkLoanEligibility(
  request: LoanEligibilityRequest,
): Promise<LoanEligibilityResponse> {
  await delay(500);
  void request; // request shape matches spec; response is fixed example

  return {
    eligibilityResult: {
      isEligible: true,
      approvalLikelihood: 85,
      riskCategory: "low",
      decisionReason: "Strong income-to-expense ratio and manageable existing debt",
    },
    recommendedLoan: {
      maxAmount: 180000.0,
      recommendedAmount: 150000.0,
      interestRate: 12.5,
      monthlyPayment: 7089.5,
      totalRepayment: 170148.0,
    },
    affordabilityAnalysis: {
      disposableIncome: 10000.0,
      debtToIncomeRatio: 20.0,
      loanToIncomeRatio: 60.0,
      affordabilityScore: "good",
    },
  };
}

/**
 * Mock implementation of:
 *   POST /api/loans/calculate-rate
 *
 * Returns the exact static example from LoanEligibilitySimulatorEndpoints.md.
 */
export async function calculateInterestRate(
  request: InterestRateCalculatorRequest,
): Promise<InterestRateCalculatorResponse> {
  await delay(400);
  void request; // request shape matches spec; response is fixed example

  return {
    interestRate: 12.5,
    monthlyPayment: 7089.5,
    totalInterest: 20148.0,
    totalRepayment: 170148.0,
    paymentSchedule: [
      {
        month: 1,
        payment: 7089.5,
        principal: 5527.17,
        interest: 1562.33,
        balance: 144472.83,
      },
      {
        month: 2,
        payment: 7089.5,
        principal: 5584.89,
        interest: 1504.61,
        balance: 138887.94,
      },
    ],
  };
}

/**
 * Mock implementation of:
 *   GET /api/loans/validation-rules
 */
export async function getValidationRules(): Promise<ValidationRulesResponse> {
  await delay(200);

  return {
    personalInfo: {
      age: {
        min: 18,
        max: 65,
        required: true,
        errorMessage: "Age must be between 18 and 65",
      },
      employmentStatus: {
        required: true,
        options: ["employed", "self_employed", "unemployed", "retired"],
        errorMessage: "Please select your employment status",
      },
      employmentDuration: {
        min: 3,
        required: true,
        errorMessage: "Minimum 3 months employment required",
      },
    },
    financialInfo: {
      monthlyIncome: {
        min: 5000.0,
        required: true,
        errorMessage: "Minimum monthly income of R5,000 required",
      },
      monthlyExpenses: {
        min: 0,
        required: true,
        errorMessage: "Please enter your monthly expenses",
      },
      creditScore: {
        min: 300,
        max: 850,
        required: false,
        errorMessage: "Credit score must be between 300 and 850",
      },
    },
    loanDetails: {
      requestedAmount: {
        min: 5000.0,
        max: 300000.0,
        required: true,
        errorMessage: "Loan amount must be between R5,000 and R300,000",
      },
      loanTerm: {
        min: 6,
        max: 60,
        required: true,
        errorMessage: "Loan term must be between 6 and 60 months",
      },
    },
  };
}