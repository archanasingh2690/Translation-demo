import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BalanceSummaryRequest, BillAccountSummary } from "./balance-summary-request";

@Injectable()
export class UserAccountInfoService {
    selectedAccountNumber = new BehaviorSubject<string>('');
    billAccountSummarySub = new BehaviorSubject<BillAccountSummary>({} as BillAccountSummary);
    constructor(private userAccountInfoApiService: UserAccountInfoApiService) { }
    getAccountBalanceSummaries(accountNumber: string): void {
        let balanceSummaryRequest: BalanceSummaryRequest = {
            accountNumber: accountNumber
        }
        this.userAccountInfoApiService.getAccountBalanceSummaries(balanceSummaryRequest).subscribe((data) => {
            this.selectedAccountNumber.next(data.accountNumber);
            this.billAccountSummarySub.next(data);
        });
    }
    getSelectedAccountNumberSub() : Observable<string>{
        return this.selectedAccountNumber.asObservable();
    }
    getBillAccountSummarySub(): Observable<BillAccountSummary> {
        return this.billAccountSummarySub.asObservable();
    }
    onChangeAccountNumber(accountNumber: string) {
        this.getAccountBalanceSummaries(accountNumber);
    }
}
@Injectable()
export class UserAccountInfoApiService {
    constructor(private http: HttpClient) { }
    getAccountBalanceSummaries(balanceSummaryRequest: BalanceSummaryRequest): Observable<any> {
        if (balanceSummaryRequest.accountNumber != '')
            return this.http.get('/assets/test/user-account-info.json');
        else return this.http.get('/assets/test2.json');
    }

}