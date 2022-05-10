import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UserAccountInfoService {
    constructor(private http: HttpClient) { }
    getAccountBalanceSummaries(accountNumber: string): Observable<any> {
        if (accountNumber != '')
            return this.http.get('/assets/test/user-account-info.json');
        else return this.http.get('/assets/test2.json');
    }

}