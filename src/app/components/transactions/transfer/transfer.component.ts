import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { TransferReq } from '../models/Transfer_Request';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  transferForm: FormGroup = new FormGroup({});
  transferReq = { } as TransferReq;
  modalStatus:boolean=false;
  accountBalance = {balance : 5824.76}


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
       categoryCode:'#d51271',
       dates : this.fb.group({
         valueDate:new Date().getTime()

       }),
       transaction : this.fb.group({
          type:'online Transfer',
          creditDebitIndicator:'DBIT',
          amountCurrency: this.fb.group({
            amount:['',{validators:[Validators.required,this.util.amountValidator(this.accountBalance.balance)]}],
            currencyCode:'EUR'
          })
       }),
      merchant:this.fb.group({
          name:[''],
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
      this.txn_service.transferMoney(this.transferReq);
      let availableBal = this.transferReq.accountBalance - this.transferReq.transaction.amountCurrency.amount;
      this.transferForm.patchValue({'accountBalance': availableBal});
      this.transferForm.get('transaction')?.reset();
      return;
  }


  openModal(){
    this.transferReq = this.transferForm.value;
    if(this.transferForm.valid){
      this.modalStatus = true;
      return;
    }
    this.closeModal();
}

  closeModal(){
    this.modalStatus = false;
  }





}
