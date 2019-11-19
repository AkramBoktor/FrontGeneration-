import { Injector, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorizeClaims } from '../config/authorize-config';
import { FormControlError } from '../models/controls/interfaces';
import { AuthorizeClaimsService } from '../services/authorize-claims.service';
import { SideMenuService } from '../services/side-menu.service';
import { HttpClient } from '@angular/common/http';

export abstract class AppBaseComponent implements OnDestroy {
    subscriptions: Subscription[] = [];
    errorMessages: FormControlError[] = [];
    authorizeClaims: AuthorizeClaims;

    activatedRoute: ActivatedRoute;
    router: Router;
    formBuilder: FormBuilder;
    attachmentForm: FormGroup;

    sideMenuService: SideMenuService;
    authorizeClaimsService: AuthorizeClaimsService;

    http: HttpClient;
    constructor(injector: Injector) {
        this.activatedRoute = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.formBuilder = injector.get(FormBuilder);
        this.http = injector.get(HttpClient);

        this.sideMenuService = injector.get(SideMenuService);
        this.authorizeClaimsService = injector.get(AuthorizeClaimsService);
        // Set Sidebar menu items for route.
        const moduleName = this.activatedRoute.snapshot.data.moduleName;
        const menuName = this.activatedRoute.snapshot.data.menuName;
        this.sideMenuService._fuseNavigationService
            .setCurrentNavigation(menuName);
        this.authorizeClaims = this.authorizeClaimsService.getModuleClaims(moduleName);

        this.attachmentForm = this.formBuilder.group({
            attachmentFiles: [null]
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }
} 
