import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError  } from 'rxjs';
import { catchError,  map, shareReplay, take, tap } from 'rxjs/operators';
import { TxnResponse } from './models/Transaction_Response';
import * as localStore from '../../shared/external-lib/recruitment-fe-assignment-main/bb-ui/mock-data/transactions.json';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private dataStoreObs$ = new BehaviorSubject<TxnResponse[]>([])
  currentSearchValue$ : Observable<TxnResponse[]> = this.dataStoreObs$.asObservable();
  baseUrl = environment.base_url;

  constructor(private http:HttpClient) {
  }

//get transactions from the server
   getRemoteTRansactions(){
    return this.http.get<TxnResponse[]>(`${this.baseUrl}/transactions`).pipe(
      shareReplay(),
      take(1),
      tap((res)=>{
         this.dataStoreObs$.next(res)
       }),
       catchError(()=> this.getAlternativeBackup())
       )
   }


  //retrieve local data
   getAlternativeBackup(){
      of(localStore).pipe(
       map((res:any)=>{
         return res['data'];
       }),
       tap((res)=>{
        this.dataStoreObs$.next(res)
      })
     ).subscribe();
     return this.dataStoreObs$;
   }

//Filter transactions by name
//There is no need to debounce/Trottle or cache since we already have the data locally
   filterTransactions(name:string):Observable<TxnResponse[]>{
     if(!name){
       return this.currentSearchValue$;
     }
     name = name.replace(/\s+/g, ' ').trim();
     return this.currentSearchValue$.pipe(
       map((res)=>{
          return res.filter(res=> res.merchant.name.toLocaleLowerCase() == name.toLocaleLowerCase()
         )
       })
     )
   }


//Transfer Money
   transferMoney(req:any){
     let currentTransactions = this.dataStoreObs$.getValue();
     currentTransactions.unshift(req);
     this.dataStoreObs$.next(currentTransactions);
   }




}
