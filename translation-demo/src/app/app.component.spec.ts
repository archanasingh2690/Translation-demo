import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { AppComponent } from './app.component';
import { AccountInfo, BalanceSummaryModel, TileModel, UserModel } from './balance-summary-request';
import { UserAccountInfoService } from './user-account-info.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let userService: UserAccountInfoService;
  let accountData: AccountInfo;
  let accountDataWithoutUser: AccountInfo;
  let user: UserModel;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [{ provide: UserAccountInfoService }],
      imports: [HttpClientModule]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    let httpClient = TestBed.inject(HttpClient);
    httpClient.get('/assets/test/user-account-info.json').subscribe((data: any) => {
      accountData = data;
      accountDataWithoutUser = data;
      accountDataWithoutUser.user = {} as UserModel;
    }, (error) => {
      console.log(error);
      throw Error(error);
    }, () => { console.log("completed"); });
    userService = TestBed.inject(UserAccountInfoService);
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  })

  it('method should be called', () => {
    spyOn(component, 'getAccountBalanceSummary');
    fixture.detectChanges(); // trigger ngOnInit here
    expect(component.getAccountBalanceSummary).toHaveBeenCalled();
  });
  it('user is not null when getAccountBalanceSummary is called with account number as empty', waitForAsync(() => {
    const accountNumber = '';
    spyOn(component, 'makeTileData');
    component.getAccountBalanceSummary(accountNumber);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.billAccountSummary.user).toBeDefined();
    });
  }));
  it('billAccountSummary is set when getAccountBalanceSummary called with account number', waitForAsync(() => {
    const accountNumber = '272794700';
    spyOn(component, 'makeTileData');
    spyOn(userService, 'getAccountBalanceSummaries').and.returnValue(of(accountData));
    component.getAccountBalanceSummary(accountNumber);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.billAccountSummary).toBeDefined();
      expect(component.billAccountSummary.balanceSummaries.length).toEqual(3);
    });
  }));

  it('user is empty when getAccountBalanceSummary is called with account number', waitForAsync(() => {
    const accountNumber = '272794700';
    spyOn(component, 'makeTileData');
    spyOn(userService, 'getAccountBalanceSummaries').and.returnValue(of(accountDataWithoutUser));
    component.getAccountBalanceSummary(accountNumber);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.billAccountSummary.user).toEqual({} as UserModel);
    });
  }));
  it('makeTileData should return an array', () => {
    const expectedResult: TileModel[] = [
      { amount: 112.92, currency: 'USD', icon: 'Test1', label: 'Balance Due' }, // change Icon value as per the enum you have in your aaplication
      { amount: 42.33, currency: 'USD', icon: 'Test2', label: 'Disputed' },
      { amount: 42.33, currency: 'USD', icon: 'Test2', label: 'Disputed' }
    ];
    let result = component.makeTileData(accountData.balanceSummaries);
    expect(result).toEqual(expectedResult);
  });
});
