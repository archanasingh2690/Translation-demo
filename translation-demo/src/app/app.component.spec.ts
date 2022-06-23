// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { BillAccountSummary, CurrencyModel, iconNames, Money, TileModel } from './balance-summary-request';
// import { UserAccountInfoApiService, UserAccountInfoService } from './user-account-info.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// describe('AppComponent', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;
//   let userService: UserAccountInfoService;
//   let accountData: BillAccountSummary;
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [
//         AppComponent
//       ],
//       providers: [{ provide: UserAccountInfoService }, { provide: UserAccountInfoApiService }],
//       imports: [HttpClientTestingModule]
//     }).compileComponents();
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     userService = TestBed.inject(UserAccountInfoService);
//     await fetch('/assets/test/user-account-info.json').then((data) => {
//       return data.json();
//     }).then((c) => { accountData = c; });
//   });
//   afterEach(() => {
//     TestBed.resetTestingModule();
//   })

//   it('method should be called', () => {
//     spyOn(component, 'intializeBalanceData');
//     spyOn(userService, 'getAccountBalanceSummaries');
//     fixture.detectChanges(); // trigger ngOnInit here
//     expect(component.intializeBalanceData).toHaveBeenCalled();
//     expect(userService.getAccountBalanceSummaries).toHaveBeenCalledWith('');
//     expect(component.userAccounts).toBeDefined();
//   });
//   it('billaccountsummary and selected account has been set from subscription', (async () => {
//     const accountNumber = '';
//     component.intializeBalanceData();
//     const service = fixture.debugElement.injector.get(UserAccountInfoService);
//     service.billAccountSummarySub.next(accountData);
//     service.selectedAccountNumber.next('272794700');
//     expect(component.billAccountSummary).toEqual(accountData);
//     expect(component.selectedAccount).toEqual('272794700');
//     expect(component.summaryAccounts).toBeDefined();
//   }));

//   it('onAccountSelect should call onChangeAccountNumber from userAccountInfoService', (async () => {
//     spyOn(userService, 'onChangeAccountNumber');
//     const e = { target: { value: '12345789' } };
//     component.onAccountSelect(e)
//     fixture.detectChanges();
//     expect(userService.onChangeAccountNumber).toHaveBeenCalledWith(e.target.value);
//   }));
//   it('makeTileData should return an array', (async () => {
//     const expectedResult: TileModel[] = [
//       { icon: iconNames.unit_measurement_time, label: 'Balance Due', money: [{ currency: 'USD', amount: 112.92 }] }, // change Icon value as per the enum you have in your aaplication
//       { icon: iconNames.brand_stop_hold_s, label: 'Disputed', money: [{ currency: 'USD', amount: 100.33 }] },
//       { icon: iconNames.status_warning, label: 'Past Due', money: [{ currency: 'USD', amount: 42.33 }] },
//     ];
//     let result = component.makeTileData(accountData.balanceSummaries);
//     spyOn(component, 'validateMoneyTile');
//     fixture.whenStable().then(() => {
//       expect(result).toEqual(expectedResult);
//       expect(component.balanceCurrencyText).toEqual('Amounts are shown in USD');
//     });
//   }));
//   it('makeTileData should set balanceCurrencyText for multiple currencies', (async () => {
//     accountData.balanceSummaries.forEach(x => {
//       if (x.amountType == 'Balance Due') {
//         x.amountType = ''
//       }
//     });
//     let result = component.makeTileData(accountData.balanceSummaries);
//     fixture.whenStable().then(() => {
//       expect(component.balanceCurrencyText).toEqual('Balances are in multiple currencies');
//     });
//   }));

//   it('addMoneyByCurrency should return sum into currency array as per balance summary money', (async () => {
//     const expectedArr: CurrencyModel[] = [{
//       amount: 200.44, currency: 'USD'
//     }]
//     let result = component.addMoneyByCurrency([{ amount: 100.22, currency: 'USD' }], { amount: 100.22, currency: 'USD' } as Money);
//     fixture.whenStable().then(() => {
//       expect(result).toEqual(expectedArr);
//     });
//   }));
//   it('addMoneyByCurrency should return currency array with current object when intial currency array is empty', (async () => {
//     const expectedArr: CurrencyModel[] = [{
//       amount: 100.22, currency: 'USD'
//     }]
//     let result = component.addMoneyByCurrency([], { amount: 100.22, currency: 'USD' } as Money);
//     fixture.whenStable().then(() => {
//       expect(result).toEqual(expectedArr);
//     });
//   }));
// });
