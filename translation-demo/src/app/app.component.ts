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
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
}
