export type EligibilityResult = {
  isEligible: boolean;
  approvalLikelihood: number;
  riskCategory: string;
  decisionReason: string;
}

export type RecommendedLoan = {
  maxAmount: number;
  recommendedAmount: number;
  interestRate: number;
  monthlyPayment: number;
  totalRepayment: number;
}

export type AffordabilityAnalysis = {
  disposableIncome: number;
  debtToIncomeRatio: number;
  loanToIncomeRatio: number;
  affordabilityScore: string;
}

export type LoanEligibilityResponse = {
  eligibilityResult: EligibilityResult;
  recommendedLoan: RecommendedLoan;
  affordabilityAnalysis: AffordabilityAnalysis;
}