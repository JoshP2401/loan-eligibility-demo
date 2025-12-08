export type InterestRateRange = {
  min: number;
  max: number;
};

export type LoanProduct = {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  interestRateRange: InterestRateRange;
  purposes: string[];
};

export type LoanProductsResponse = {
  products: LoanProduct[];
};