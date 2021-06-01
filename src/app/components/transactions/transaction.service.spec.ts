import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing'

import { TransactionService } from './transaction.service';
import * as LocalStore from '../../shared/external-lib/recruitment-fe-assignment-main/bb-ui/mock-data/transactions.json';
import { BehaviorSubject, of } from 'rxjs';
import { TxnResponse } from './models/Transaction_Response';
import { environment }  from '../../../environments/environment';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;
  let localStore$ = new BehaviorSubject<TxnResponse[]>([]);
  let localData:any = LocalStore
  let mockFData:TxnResponse[]= [{
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
  }]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('It should return local data',()=>{
     localStore$.next(localData['data'])
     let currentSearchValue = service.getAlternativeBackup();
     expect(currentSearchValue).toEqual(localStore$)
  })

  it('it should return response eqaul `fileteredData` when Texaco is searched for',()=>{
    service.getAlternativeBackup();
    let filterResult:TxnResponse[] = [];
    service.filterTransactions('Texaco').subscribe((res)=>{
      filterResult = res
    });
    expect(filterResult).toEqual(mockFData)
  })

  it('it should not be case sensitive return response equal `fileteredData` when searched with TEXaco',()=>{
    service.getAlternativeBackup();
    let filterResult:TxnResponse[] = [];
    service.filterTransactions('TEXaco').subscribe((res)=>{
      filterResult = res
    });
    expect(filterResult).toEqual(mockFData)
  })

  it('it should ignore preceeding and trailing white spaces `fileteredData` when searched with ` TEXaco   `',()=>{
    service.getAlternativeBackup();
    let filterResult:TxnResponse[] = [];
    service.filterTransactions(' TEXaco  ').subscribe((res)=>{
        filterResult = res
    });
    expect(filterResult).toEqual(mockFData)
  })


it('should return data from the server',()=>{
     service.getRemoteTRansactions().subscribe((res:any)=>{
       expect(res).toEqual(mockFData)
   })
   let req = httpMock.expectOne(`${environment.base_url}/transactions`)
   expect(req.request.method).toBe('GET')
   req.flush(mockFData)
})

it('should return local data when request fails',()=>{
   service.getRemoteTRansactions().subscribe()
   let req = httpMock.expectOne(`${environment.base_url}/transactions`)
   expect(req.request.method).toBe('GET')
   req.error(new ErrorEvent('simulated error'))
   service.currentSearchValue$.subscribe((res)=>{
    expect(res).toEqual(localData['data'])
  })
})






});
