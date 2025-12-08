export type PaymentScheduleItem = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export type InterestRateCalculatorResponse = {
  interestRate: number;
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  paymentSchedule: PaymentScheduleItem[];
}