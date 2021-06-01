import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TxnResponse } from '../models/Transaction_Response';
import { TransactionService } from '../transaction.service';


@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss']
})
export class TransactionViewComponent implements OnInit {

  transactions$ : Observable<TxnResponse[]> = this.txn_service.currentSearchValue$;


  constructor(private txn_service:TransactionService) { }



  ngOnInit(): void {
    this.getTransactions();
  }

  search(e:string){
    this.transactions$ = this.txn_service.filterTransactions(e)
  }

  getTransactions(){
    this.txn_service.getRemoteTRansactions().subscribe();
  }


}
