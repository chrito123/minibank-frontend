import { AccountType } from "./account-type.enum";
import { Transaction } from "./transaction-type";


export interface Account {
  id: number;
  customerId: number;
  balance: number;
  transactions: Transaction[];
  type: AccountType;
}
