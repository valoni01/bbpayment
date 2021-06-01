import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { ColorCode, TransferReq, TxnType } from '../models/Transfer_Request';
import { TransactionService } from '../transaction.service';
import {environment as env} from '../../../../environments/environment'

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  transferForm: FormGroup = new FormGroup({});
  transferReq = { } as TransferReq;
  modalStatus:boolean=false;
  accountBalance = { balance : 5824.76}
  txnType = TxnType;
  colorCode = ColorCode;


  constructor(private fb:FormBuilder,private txn_service:TransactionService, private util:UtilitiesService) {
    this.createTransferForm();
  }

  ngOnInit(): void {
    return;
  }

  createTransferForm(){
    this.transferForm = this.fb.group({
       accountBalance: this.accountBalance.balance,
       id:new Date().getTime(),
       categoryCode:this.colorCode.Red,
       dates : this.fb.group({
         valueDate:new Date().getTime()

       }),
       transaction : this.fb.group({
          type:this.txnType.OnlineTransfer,
          creditDebitIndicator:'DBIT',
          amountCurrency: this.fb.group({
            amount:['',{validators:[Validators.required,this.util.amountValidator(this.accountBalance.balance)]}],
            currencyCode: env.currency_codes.EUR
          })
       }),
      merchant:this.fb.group({
          name:'',
          accountNumber:''
      })
    })
  }


  get f(){
    let ctrl = (this.transferForm.controls['transaction'] as FormGroup).controls['amountCurrency'];
    return ctrl as FormGroup;

  }



   processTranfer(){
      this.transferReq = this.transferForm.value;
      this.transferReq.merchant.name = this.transferReq.merchant.name.replace(/\s+/g, ' ').trim();
      this.txn_service.transferMoney(this.transferReq);
      let availableBal = this.transferReq.accountBalance - this.transferReq.transaction.amountCurrency.amount;
      this.transferForm.patchValue({'accountBalance': availableBal});
      this.resetForm();
      this.closeModal();
      return;
  }


  resetForm(){
    this.transferForm.get('merchant')?.reset();
    this.transferForm.get('transaction.amountCurrency.amount')?.reset()
   }

  openModal(){
    this.transferReq = this.transferForm.value;
    if(this.transferForm.valid){
      this.modalStatus = true;
      return;
    }
}

  closeModal(){
    this.modalStatus = false;
  }





}
