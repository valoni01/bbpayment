import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }


  // Transfer form amount validator
  amountValidator(balance:number){
    return (control: AbstractControl): { [key: string]: boolean } | null =>{
      const amount = control.value;
      if(amount <  0 ){
         return {'isamountValid':true}
      }
      if((balance - amount) < -500 ){
        return {'isBalanceValid':true}
      }
      return null;
    }
  }


}
