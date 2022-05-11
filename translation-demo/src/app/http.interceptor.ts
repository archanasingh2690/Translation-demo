import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class  HttpInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        req = req.clone({ headers: req.headers.append('Set-Cookie','token=123') });
        return next.handle(req);
    }
  }