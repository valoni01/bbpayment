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


export enum TxnType{
  CardPayment = 'Card Payment',
  OnlineTransfer = 'Online Transfer',
  Salaries="Salaries"
}

export enum ColorCode{
  Green='#12a580',
  Yellow='#c89616',
  Red='#d51271',
  Orange='#e25a2c',
  Blue='#1180aa'
}
