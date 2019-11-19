import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizeClaimsService } from 'app/shared/services/authorize-claims.service';

@Injectable({
  providedIn: 'root'
})
export class LookupGuard implements CanActivate {
  constructor(protected router: Router,
    protected authorizeClaimsService: AuthorizeClaimsService,
    protected activatedRoute: ActivatedRoute) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(route.data);
      return true;
    const moduleName = this.activatedRoute.snapshot.data.moduleName;
      return this.authorizeClaimsService.validateSearchClaims(moduleName);
  }
  
}
