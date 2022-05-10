import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'accountFromat'})
export class AccountFormatPipe implements PipeTransform {
  transform(value: string): string {
      let accountNumber: string;
      accountNumber = value.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3');
      return accountNumber;
  }
}