import { Account } from "./Account";


export interface Customer {
  id: number;
  name: string;
  surname: string;
  accounts: Account[];
}
