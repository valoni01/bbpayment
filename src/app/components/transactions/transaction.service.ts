import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError  } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { TxnResponse } from './models/Transaction_Response';
import * as localStore from '../../shared/external-lib/recruitment-fe-assignment-main/bb-ui/mock-data/transactions.json';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private dataStoreObs$ = new BehaviorSubject<TxnResponse[]>([])
  currentSearchValue$ : Observable<TxnResponse[]> = this.dataStoreObs$.asObservable();

  constructor(private http:HttpClient) {
    this.getTransactions();
  }

   getTransactions(){
     this.http.get<TxnResponse[]>('https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions').pipe(
      map((res)=>{
        res= res.sort((a:any,b:any)=>{
          return b.dates.valueDate - a.dates.valueDate
       })
       return res
      }),
      tap((res)=>{
         this.dataStoreObs$.next(res)
       }),
       catchError((b):any=>{
        return this.getAlternativeBackup();
      }),
      ).subscribe();
   }

   getAlternativeBackup(){
     of(localStore).pipe(
       map((res:any)=>{
         return res['data'];
       }),
       tap((res)=>{
        this.dataStoreObs$.next(res)
      })
     ).subscribe();
   }


   filterTransactions(name:string):Observable<TxnResponse[]>{
     if(!name){
       return this.currentSearchValue$;
     }
     return this.currentSearchValue$.pipe(
       map((res)=>{
         return res.filter((res)=>{
           return res.merchant.name.toLocaleLowerCase() == name.toLocaleLowerCase();
         })
       })
     )
   }


   transferMoney(req:any){
     let currentTransactions = this.dataStoreObs$.getValue();
     currentTransactions.unshift(req);
     this.dataStoreObs$.next(currentTransactions);
   }




}
