import { TestBed } from "@angular/core/testing";
import { Alert, AlertService } from "./alert.service";

describe('AlertService', () => {
    let alertService: AlertService;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [AlertService],
            imports: []
        });
        alertService = new AlertService();
    });
    afterEach(() => {
        TestBed.resetTestingModule();
    });
    it('alert should be set when handleError is called', () => {
        const errorObj: Alert[] = [{ message: 'test-error-1', status: 500, type: 'Warning' }];
        alertService.handleError(errorObj);
        expect(alertService.alerts).toEqual(errorObj);
    });
});