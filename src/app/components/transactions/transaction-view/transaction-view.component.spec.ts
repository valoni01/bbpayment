import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { TransactionService } from '../transaction.service';

import { TransactionViewComponent } from './transaction-view.component';

describe('TransactionViewComponent', () => {
  let component: TransactionViewComponent;
  let fixture: ComponentFixture<TransactionViewComponent>;
  let MockedTxnService:TransactionService;

  beforeEach(async () => {
    MockedTxnService = jasmine.createSpyObj(['getRemoteTRansactions','filterTransactions'])
    await TestBed.configureTestingModule({
      declarations: [ TransactionViewComponent ],
      providers:[
        {
          provide:TransactionService, useValue:MockedTxnService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });




});
