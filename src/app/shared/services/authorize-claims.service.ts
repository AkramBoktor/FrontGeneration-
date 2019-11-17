import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizeClaims, authorizeConfig } from '../config/authorize-config';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeClaimsService {
    constructor(private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private router: Router) {
    }

    validateSearchClaims(moduleName: string): boolean | Promise<boolean> {
        if (!moduleName) {
            return true;
        }

        const moduleClaims = this.getModuleClaims(moduleName);
        return moduleClaims === undefined ? true :
            this.authService.hasPermission(moduleClaims.CanSearch, moduleName) ? true :
                this.router.navigate(['/home']);
    }

    getModuleClaims(name?: string): AuthorizeClaims {
        const moduleName = name ? name : this.activatedRoute.snapshot.data['moduleName'];
        const authorizeClaims = moduleName && authorizeConfig[moduleName] ? authorizeConfig[moduleName] : {};
        return authorizeClaims;
    }
}
