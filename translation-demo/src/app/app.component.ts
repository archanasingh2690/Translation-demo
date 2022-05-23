import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { subscribeOn, Subscription } from 'rxjs';
import { AccountInfo, BalanceSummaryModel, BalanceSummaryRequest, BillAccountSummary, CurrencyModel, iconNames, TileModel } from './balance-summary-request';
import { UserAccountInfoService } from './user-account-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'translation-demo';
  accountNumber = "123412341";
  billAccountSummary: BillAccountSummary = {} as BillAccountSummary;
  selectAccountSub = new Subscription();
  billAccountSummarySub = new Subscription();
  selectedAccount!: string;
  userAccounts: AccountInfo[] = [];
  summaryAccounts: TileModel[] = [];
  balanceCurrencyText: string = '';
  constructor(private userAccountInfoService: UserAccountInfoService) {
    this.selectedAccount = '';
  }
  ngOnDestroy(): void {
    this.selectAccountSub.unsubscribe();
    this.billAccountSummarySub.unsubscribe();
  }
  ngOnInit(): void {
    this.intializeBalanceData();
    this.userAccountInfoService.getAccountBalanceSummaries('');
  }
  intializeBalanceData() {
    this.billAccountSummarySub = this.userAccountInfoService.getBillAccountSummarySub().subscribe(value => {
      this.billAccountSummary = value;
      if (this.billAccountSummary.user != null) {
        this.userAccounts = this.billAccountSummary.user.accountsInfo;
      }
      if (this.billAccountSummary != null) {
        this.summaryAccounts = this.makeTileData(this.billAccountSummary.balanceSummaries);
      }
    });
    this.selectAccountSub = this.userAccountInfoService.getSelectedAccountNumberSub().subscribe(value => {
      this.selectedAccount = value;
    });
  }
  onAccountSelect(e: any) {
    this.userAccountInfoService.onChangeAccountNumber(e.target.value);
  }
  addMoneyByCurrency(arr: CurrencyModel[], curObj: CurrencyModel): CurrencyModel[] {
    const arrLen = arr.length;
    const preObj = arr[arrLen - 1];
    if (preObj && preObj.currency === curObj.currency) {
      preObj.amount += curObj.amount;
    }
    else arr.push(curObj);
    return arr;
  }
  validateMoneyTile(tile: TileModel): void {
    if (tile.money.length === 0)
      tile.money.push({});
  }
  makeTileData(data: BalanceSummaryModel[]): TileModel[] {
    let tileDataArr: TileModel[] = [];
    let iconName: string;
    let tileObj: TileModel;
    data.map(item => {
      const tile: TileModel = {
        label: item.amountType,
        money: [],
        icon: iconName
      };
      switch (item.amountType) {
        case "Balance Due":
          tileObj = {
            label: 'Balance Due',
            money: this.addMoneyByCurrency([], item.money),
            icon: iconNames.unit_measurement_time
          };
          tileDataArr.push(tileObj);
          break;
        case "Disputed":
          tileObj = {
            label: 'Disputed',
            money: this.addMoneyByCurrency([], item.money),
            icon: iconNames.brand_stop_hold_s
          };
          tileDataArr.push(tileObj);
          break;
        case "Past Due":
          tileObj = {
            label: 'Past Due',
            money: this.addMoneyByCurrency([], item.money),
            icon: iconNames.status_warning
          };
          tileDataArr.push(tileObj);
          break;
        default:
          iconName = iconNames.status_warning;
      }
    });
    tileDataArr.map(tile => this.validateMoneyTile(tile));
    if (tileDataArr.find(x => x.label === 'Balance Due')?.money?.length === 1) {
      this.balanceCurrencyText = `Amounts are shown in ${tileDataArr.find(x => x.label === 'Balance Due')?.money[0].currency}`;
    }
    else this.balanceCurrencyText = 'Balances are in multiple currencies';
    return tileDataArr;
  }
}
