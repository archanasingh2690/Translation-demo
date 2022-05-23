import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { BehaviorSubject, of } from "rxjs";
import { BillAccountSummary } from "./balance-summary-request";
import { UserAccountInfoApiService, UserAccountInfoService } from "./user-account-info.service";

describe('UserAccountInfoService', () => {
    let service: UserAccountInfoService;
    let accountData: BillAccountSummary;
    let apiService: UserAccountInfoApiService;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [{ provide: UserAccountInfoService }, { provide: UserAccountInfoApiService }],
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(UserAccountInfoService);
        apiService = TestBed.inject(UserAccountInfoApiService);
        await fetch('/assets/test/user-account-info.json').then((data) => {
            return data.json();
        }).then((c) => { accountData = c; });
    });
    afterEach(() => {
        TestBed.resetTestingModule();
    });
    it('service should be created and get getAccountBalanceSummaries should emit value for behaviour subjects', () => {
        spyOn(apiService, 'getAccountBalanceSummaries').and.returnValue(of(accountData));
        service.getAccountBalanceSummaries('');
        service.billAccountSummarySub.subscribe(value => {
            expect(value).toEqual(accountData);
        });
        service.selectedAccountNumber.subscribe(value => {
            expect(value).toEqual('272794700');
        });
        expect(service).toBeTruthy();
    });
    it('onChangeAccountNumber should call getAccountBalanceSummaries with selected account number', () => {
        spyOn(service, 'getAccountBalanceSummaries');
        service.onChangeAccountNumber('272794700');
        expect(service.getAccountBalanceSummaries).toHaveBeenCalledWith('272794700');
    });
    it('getSelectedAccountNumberSub should return observable', () => {
        spyOn(apiService, 'getAccountBalanceSummaries').and.returnValue(of(accountData));
        service.getAccountBalanceSummaries('272794700');
        let result = service.getSelectedAccountNumberSub();
        result.subscribe(value => {
            expect(value).toEqual('272794700');
        });
    });
    it('getBillAccountSummarySub should return observable', () => {
        spyOn(apiService, 'getAccountBalanceSummaries').and.returnValue(of(accountData));
        service.getAccountBalanceSummaries('');
        let result = service.getBillAccountSummarySub();
        result.subscribe(value => {
            expect(value).toEqual(accountData);
        });
    });
});