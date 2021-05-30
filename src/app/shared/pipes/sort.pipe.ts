import { Pipe, PipeTransform } from '@angular/core';
import { TxnResponse } from 'src/app/components/transactions/models/Transaction_Response';

@Pipe({
  name: 'SortPipe'
})
export class SortPipe implements PipeTransform {

  transform(value: TxnResponse[], ...args: unknown[]): unknown {
    let sorted = value.sort((a:any,b:any)=>{
       return a.dates.valueDate - b.dates.valueDate
    })
    return sorted;
  }

}
