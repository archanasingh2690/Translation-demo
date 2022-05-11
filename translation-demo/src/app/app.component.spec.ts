import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { AppComponent } from './app.component';
import { AccountInfo, BalanceSummaryModel, TileModel, UserModel } from './balance-summary-request';
import { UserAccountInfoService } from './user-account-info.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let userService: UserAccountInfoService;
  let accountData: AccountInfo;
  let httpClient: HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [{ provide: UserAccountInfoService }],
      imports: [HttpClientModule]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    userService = TestBed.inject(UserAccountInfoService);
    const data  = await httpClient.get<AccountInfo>('/assets/test/user-account-info.json').toPromise();
    accountData = data!;
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  })

  it('method should be called', () => {
    spyOn(component, 'getAccountBalanceSummary');
    fixture.detectChanges(); // trigger ngOnInit here
    expect(component.getAccountBalanceSummary).toHaveBeenCalled();
  });
  it('user is not null when getAccountBalanceSummary is called with account number as empty', (async () => {
    const accountNumber = '';
    spyOn(userService, 'getAccountBalanceSummaries').and.returnValue(of(accountData));
    component.getAccountBalanceSummary(accountNumber);
    fixture.whenStable().then(() => {
      expect(component.billAccountSummary.user).toBeDefined();
      expect(component.billAccountSummary.user.accountsInfo.length).toEqual(3);
    });
  }));
  it('billAccountSummary is set when getAccountBalanceSummary called with account number', (async() => {
    const accountNumber = '272794700';
    spyOn(component, 'makeTileData');
    spyOn(userService, 'getAccountBalanceSummaries').and.returnValue(of(accountData));
    component.getAccountBalanceSummary(accountNumber);
    fixture.whenStable().then(() => {
      expect(component.billAccountSummary).toBeDefined();
      expect(component.billAccountSummary.balanceSummaries.length).toEqual(3);
    });
  }));

  it('user is empty when getAccountBalanceSummary is called with account number', (async () => {
    const accountNumber = '272794700';
    spyOn(component, 'makeTileData');
    accountData.user = {} as UserModel;
    spyOn(userService, 'getAccountBalanceSummaries').and.returnValue(of(accountData));
    await component.getAccountBalanceSummary(accountNumber);
    fixture.whenStable().then(() => {
      expect(component.billAccountSummary.user).toEqual({} as UserModel);
    });
  }));
  it('makeTileData should return an array', (async () => {
    const expectedResult: TileModel[] = [
      { amount: 112.92, currency: 'USD', icon: 'Test1', label: 'Balance Due' }, // change Icon value as per the enum you have in your aaplication
      { amount: 42.33, currency: 'USD', icon: 'Test2', label: 'Disputed' },
      { amount: 42.33, currency: 'USD', icon: 'Test2', label: 'Disputed' }
    ];
    let result = component.makeTileData(accountData.balanceSummaries);
    fixture.whenStable().then(() => {
      expect(result).toEqual(expectedResult);
    });
  }));
});
