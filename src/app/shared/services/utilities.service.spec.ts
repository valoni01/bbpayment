import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl } from '@angular/forms';

import { UtilitiesService } from './utilities.service';

describe('UtilitiesService', () => {
  let service: UtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return `isBalanceValid true` when the difference between the and balance is more than -500', () => {
     let response = service.amountValidator(5)(new FormControl(50000))
     console.log(response)

    expect(response).toEqual({'isBalanceValid':true});
  });

  it('should return `isAmountValid true` when the amount entered is less than 0', () => {
    let response = service.amountValidator(5000)(new FormControl(-1));
    console.log(response)
   expect(response).toEqual({'isamountValid':true});
 });

  it('should return null', () => {
     let response = service.amountValidator(5000)(new FormControl(100))
     console.log(response)
   expect(response).toEqual(null);
});


});
