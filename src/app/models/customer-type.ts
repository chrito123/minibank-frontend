import { Account } from "./account-type";


export interface Customer {
  id: number;
  name: string;
  surname: string;
  accounts: Account[];
}
