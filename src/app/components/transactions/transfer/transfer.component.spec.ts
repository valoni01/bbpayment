import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TransactionService } from '../transaction.service';

import { TransferComponent } from './transfer.component';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;
  let Mockservice = jasmine.createSpyObj(['transferMoney'])
  let MockedData = [{
    "categoryCode": "#d51271",
    "dates": {
      "valueDate": "2020-09-19"
    },
    "transaction": {
      "amountCurrency": {
        "amount": '84.64' as unknown as number,
        "currencyCode": "EUR"
      },
      "type": "Card Payment",
      "creditDebitIndicator": "DBIT"
    },
    "merchant": {
      "name": "Texaco",
      "accountNumber": "SI64397745065188826"
    }
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,FormsModule],
      declarations: [
         TransferComponent
       ],
       providers:[
         {provide:TransactionService,useValue:Mockservice},
       ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form should be invalid when empty', () => {
    expect(component.transferForm.valid).toBeFalsy();
  });

  it('Amount field should be invalid on init', () => {
    expect(component.transferForm.get('transaction.amountCurrency.amount')?.invalid).toBeTruthy();
  });

 it('Amount fields should be valid when amount is inputed',()=>{
   component.transferForm.get('transaction.amountCurrency')?.patchValue({amount:10})
   expect(component.transferForm.get('transaction.amountCurrency.amount')?.invalid).toBeFalsy()    // component.processTranfer()
 })

 it('',()=>{
  component.transferForm.get('transaction.amountCurrency')?.patchValue({amount:10})
  expect(component.transferForm.get('transaction.amountCurrency.amount')?.invalid).toBeFalsy()    // component.processTranfer()
})

it('It should call the transferMoney service', () => {
     Mockservice.transferMoney.and.returnValue(MockedData)
     component.transferForm.get('transaction.amountCurrency')?.patchValue({amount:84.64})
     component.processTranfer()
     expect(Mockservice.transferMoney).toHaveBeenCalled()
  });


});
