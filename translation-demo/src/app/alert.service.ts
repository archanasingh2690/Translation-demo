import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

@Injectable()
export class AlertService {
    alerts: Alert[] = [];
    constructor() { }
    handleError(error: Alert[]): Observable<never> {
        this.alerts = error;
        return throwError(error);
    }
}

export interface Alert {
    message: string;
    status: number;
    type: string;
}