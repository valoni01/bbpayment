import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionViewComponent } from './transaction-view/transaction-view.component';
import { TransferComponent } from './transfer/transfer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BbUIModule } from 'src/app/shared/external-lib/recruitment-fe-assignment-main/bb-ui/bb-ui.module';

@NgModule({
  declarations: [TransactionViewComponent,TransferComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BbUIModule

  ],
  exports:[TransferComponent,TransactionViewComponent]
})
export class TransactionsModule { }
