import { TxnResponse } from "./Transaction_Response";


export interface TransferReq{
  id:string;
  accountBalance:number;
  categoryCode:string;
  dates:{valueDate:string};
  transaction:Transaction
  merchant:Merchant
}

export interface Transaction{
  amountCurrency:{
    amount:number
    currencyCode:string;
  }
  type:string;
  creditDebitIndicator:string

}

export interface Merchant{
 name:string;
 accountNumber:string;
}
