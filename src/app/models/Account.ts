import { Transaction } from "./Transaction";


export interface Account {
  id: number;
  customerId: number;
  balance: number;
  transactions: Transaction[];
}
