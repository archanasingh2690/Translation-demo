import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { AlertService } from './alert.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor(private alertService: AlertService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log("Passed through the interceptor in request");

        return next.handle(request)
            .pipe(
                map(res => {
                    this.alertService.handleError([{ message: 'Alert Error', status: 200, type: 'Warning' }]);
                    return res
                }),
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        console.log('This is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        console.log('This is server side error');
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    this.alertService.handleError([{ message: errorMsg, status: error.status, type: 'Warning' }]);
                    console.log(errorMsg);
                    return throwError(errorMsg);
                })
            )
    }
}