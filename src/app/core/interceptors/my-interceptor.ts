import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponseHandler } from 'app/shared/async-services/http-response-handler.service';
import { Constants } from 'app/shared/config/constants';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private responseHandler: HttpResponseHandler, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();

    // console.log('wewewe');

    // if (!req.url.startsWith('/') && !req.url.match(/localhost:8220/)
    //   && !req.url.match(/192.168.137.36:9999/)
    //   // && !req.url.match(/localhost:5002/)
    //   // && !req.url.match(/odata/)
    //   ){
    //   return next.handle(req);
    // }

    if (req.url.startsWith('/')) {
      req = req.clone({
        url: `${Constants.baseApiUrl}${req.url}`
      });
    }

    if (!req.headers.has('Content-Type') && !req.headers.has('enctype')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }

    if (accessToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      });
    }

    return next.handle(req)
      .pipe(catchError((err, source) => this.responseHandler.onCatch(err, source)));

  }
}
