import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponseHandler } from 'app/shared/async-services/http-response-handler.service';
import { Constants } from 'app/shared/config/constants';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  constructor(private responseHandler: HttpResponseHandler, private authService: AuthService, private activatedRoute: ActivatedRoute) { }
  accessToken: string;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
    this.accessToken = this.authService.getAccessToken();
    console.log(this.accessToken);
    if (this.accessToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.accessToken}`)
      });
    }

    if (!req.url.startsWith('/') && !req.url.match(/localhost:9889/)
    // && !req.url.match(/localhost:5002/)
    // && !req.url.match(/odata/)
    ){
    return next.handle(req);
  }

  if (req.url.startsWith('/')) {
    req = req.clone({
      url: `${Constants.baseApiUrl}${req.url}`
    });
  }

  console.log('header -> ' + req.headers.get('Authorization'));
    return next.handle(req)
      .pipe(catchError((err, source) => this.responseHandler.onCatch(err, source)));

  }
}
