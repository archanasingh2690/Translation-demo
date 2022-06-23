import { HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpTestingController } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { AlertService } from "./alert.service";
import { ErrorCatchingInterceptor } from "./http-error.interceptor";
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { Observable, of, throwError } from "rxjs";
import { Type } from "@angular/core";

describe('ErrorCatchingInterceptor', () => {
    let alertService: AlertService;
    let interceptor: ErrorCatchingInterceptor;
    let httpRequestSpy;
    let httpHandlerSpy;
    const interceptorOf = <T>(type: Type<T>) =>
        TestBed
            .inject(HTTP_INTERCEPTORS)
            .find(interceptor => interceptor instanceof type) as unknown as T

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AlertService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorCatchingInterceptor,
                    multi: true
                }
            ],
            imports: [
                HttpClientTestingModule]
        });
        alertService = TestBed.inject(AlertService);
        interceptor = interceptorOf(ErrorCatchingInterceptor);
    });
    afterEach(() => {
        TestBed.resetTestingModule();
    });
    it('should add alert in alert Service error response returned from api', () => {
        httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
        httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
        httpHandlerSpy.handle.and.returnValue(throwError(
            {
                error:
                    { message: 'test-error', status: '500', type: 'Warning' }
            }
        ));
        interceptor.intercept(httpRequestSpy, httpHandlerSpy)
            .subscribe(
                result => { },
                err => {
                    expect(alertService.alerts.length).toEqual(1);
                }
            );
    })
    it('should add service alerts in alert Service alert response returned from api', () => {
        httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
        httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
        httpHandlerSpy.handle.and.returnValue(of({
            body: {
                alerts: [{ message: 'test-error-1', status: '500', type: 'Warning' },
                { message: 'test-error-2', status: '500', type: 'Warning' }]
            }
        }));
        interceptor.intercept(httpRequestSpy, httpHandlerSpy)
            .subscribe(
                result => { },
                err => {
                    expect(alertService.alerts.length).toEqual(2);
                }
            );
    })
});