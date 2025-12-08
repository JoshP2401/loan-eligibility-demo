export type ValidationRule = {
  min?: number;
  max?: number;
  required: boolean;
  errorMessage: string;
  options?: string[];
}

export type PersonalInfoValidation = {
  age: ValidationRule;
  employmentStatus: ValidationRule;
  employmentDuration: ValidationRule;
}

export type FinancialInfoValidation = {
  monthlyIncome: ValidationRule;
  monthlyExpenses: ValidationRule;
  creditScore: ValidationRule;
}

export type LoanDetailsValidation = {
  requestedAmount: ValidationRule;
  loanTerm: ValidationRule;
}

export type ValidationRulesResponse = {
  personalInfo: PersonalInfoValidation;
  financialInfo: FinancialInfoValidation;
  loanDetails: LoanDetailsValidation;
}