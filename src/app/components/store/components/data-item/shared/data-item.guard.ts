import { Injectable } from '@angular/core';
import { ActivatedRoute,ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthorizeClaimsService } from 'app/shared/services/authorize-claims.service';
import { Observable } from 'rxjs';


@Injectable()
export class DataItemGuard implements CanActivate {
  constructor(protected router: Router,
    protected authorizeClaimsService: AuthorizeClaimsService,
    protected activatedRoute: ActivatedRoute) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> | boolean | UrlTree {
    const moduleName = route.data.moduleName;
      return this.authorizeClaimsService.validateSearchClaims(moduleName);
  }
}

