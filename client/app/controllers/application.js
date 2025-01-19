import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  teams = [
    {
      loanMoney: "$100,000",
      leftToRepay: "$40,500",
      duration: "8 Months",
      interestRate: "12%",
      installment: "$2,000 / month",
    },
    {
      loanMoney: "$500,000",
      leftToRepay: "$250,000",
      duration: "38 Months",
      interestRate: "10%",
      installment: "$8,000 / month",
    },
  ];
}
