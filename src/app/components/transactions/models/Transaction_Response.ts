export interface TxnResponse{
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
