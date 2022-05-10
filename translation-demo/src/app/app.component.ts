import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountInfo, BalanceSummaryModel, BalanceSummaryRequest, TileModel } from './balance-summary-request';
import { UserAccountInfoService } from './user-account-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'translation-demo';
  accountNumber = "123412341";
  billAccountSummary: AccountInfo = {} as AccountInfo;
  selectedAccount!: string;
  user: any;
  summaryAccounts: any;
  constructor(private userAccountInfoService: UserAccountInfoService) {
    //translate.setDefaultLang('en');
    //translate.use('en');
  }
  ngOnInit(): void {
    this.getAccountBalanceSummary('');
  }
  useLanguage(language: string): void {
    //this.translate.use(language);
  }
  getAccountBalanceSummary(accountNumber: string) {
    //let balanceSummaryrequest: BalanceSummaryRequest = { accountNumber: accountNumber } as BalanceSummaryRequest;
    this.userAccountInfoService.getAccountBalanceSummaries(accountNumber).subscribe(
      (data: any) => {
        this.billAccountSummary = data;
        if (this.selectedAccount === '' || this.selectedAccount == null) {
          this.user = this.billAccountSummary.user;
        }
        this.selectedAccount = this.billAccountSummary.accountNumber;
        this.summaryAccounts = this.makeTileData(this.billAccountSummary.balanceSummaries);
      });
  }
  makeTileData(data: BalanceSummaryModel[]): TileModel[] {
    let tileDataArr: TileModel[] = [];
    let iconName: string;
    data.map(item => {
      switch (item.amountType) {
        case "Balance Due":
          iconName = 'Test1';
          break;
        case "Disputed":
          iconName = 'Test2';
          break;
        case "Past Due":
          iconName = 'Test3';
          break;
        default:
          iconName = 'Test4';
      }

      let tile = {
        label: item.amountType,
        amount: item.money.amount,
        currency: item.money.currency,
        icon: iconName
      }
      tileDataArr.push(tile);
    });

    return tileDataArr;
  }
}
