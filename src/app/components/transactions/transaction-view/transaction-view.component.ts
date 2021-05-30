import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { Transaction, TxnResponse } from '../models/Transaction_Response';
import { TransactionService } from '../transaction.service';


@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss']
})
export class TransactionViewComponent implements OnInit {

  constructor(private txn_service:TransactionService) { }

  search$ = new Subject<string>();
  transactions$ : Observable<TxnResponse[]> = this.txn_service.currentSearchValue$;

  ngOnInit(): void {
    return;
  }

  search(e:string){
     this.transactions$ = this.txn_service.filterTransactions(e.replace(/\s/g, ""))
  }


}
