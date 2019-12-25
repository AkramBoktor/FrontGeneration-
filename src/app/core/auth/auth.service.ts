import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log, User, UserManager, UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../../shared/config/constants';


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private _userManager: UserManager;
    private _user: User;

    public userClaims = [];

    private testClaims = [
        {
            moduleName: 'VacationEmployee',
            claimNames: [
                // 'CanCreateVacationEmployee',
                'CanDeleteVacationEmployee',
                // 'CanEditVacationEmployee',
                'CanSearchVacationEmployee',
            ]
        },
        {
            moduleName: 'VacationContract',
            claimNames: [
                'CanCreateVacationContract',
                'CanDeleteVacationContract',
                'CanEditVacationContract',
                'CanSearchVacationContract',
            ]
        }
    ];

    constructor(private activatedRoute: ActivatedRoute,
	private httpClient: HttpClient) {
        Log.logger = console;
        const config: UserManagerSettings = {
            loadUserInfo: true,
            filterProtocolClaims: true,
            authority: Constants.stsAuthority, // url for identity server provider
            client_id: 'Angular-Client',
            redirect_uri: 'http://localhost:4200/assets/oidc-login-redirect.html', // redirect after success login
            scope: 'openid profile employee-api',
            response_type: 'id_token token', // respons type for impilict flow (id_token token)
            post_logout_redirect_uri: 'http://localhost:4200/?postLogout=true',
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            automaticSilentRenew: true,
            silent_redirect_uri: 'http://localhost:4200/assets/silent-redirect.html'
            // both redirect Uris need to be set.
        };
        this._userManager = new UserManager(config);
        this._userManager.getUser().then(user => {
            if (user && !user.expired) {
                this._user = user;
                console.log('p  ' + user.profile);
                console.log('a  ' + user.access_token);
                console.log('i  ' + user.id_token);
                this.getClaims().subscribe(x => {
                    console.log(x);
                    this.userClaims = x;
                });
            }
        });
        
        this._userManager.events.addUserLoaded(() => {
            this._userManager.getUser().then(user => {
                this._user = user;
                this.getClaims().subscribe(x => {
                    console.log(x);
                    this.userClaims = x;
                });
            });
        });
    }

    login(): Promise<any> {
        return this._userManager.signinRedirect();
    }

    login2(loginModel): Observable<any> {
        return this.httpClient.post('http://localhost:9899/account/LoginClient', loginModel);
    }

    logout(): Promise<any> {
        return this._userManager.signoutRedirect();
    }

    isLoggedIn(): Observable<boolean> {
        if (!this._user) {
            return from(this._userManager.getUser()).pipe(map(user => {
                if (this._user && this._user.access_token && !this._user.expired) {
                    this._user = user;
                    return true;
                }
                return false;
            }));
        }
        return of(this._user && this._user.access_token && !this._user.expired);
    }

    getAccessToken(): string {
        return this._user ? this._user.access_token : '';
    }

    signoutRedirectCallback(): Promise<any> {
        return this._userManager.signoutRedirectCallback();
    }

    getClaims(): any {
		return this.httpClient.get<any>(`http://localhost:9899/account/GetUserClaim/${this._user.profile.sub}`);
        // return this._user.profile;
    }

    hasPermission(moduleClaims: string | string[], moduleName?: string): boolean {
        return true;
        // moduleName = moduleName ? moduleName : this.activatedRoute.snapshot.data['moduleName'];activatedRoute

        // // const userClaims = this.testClaims.filter(x => x.moduleName === moduleName);
        // let userClaimNames = [];
        // if (this.userClaims.length > 0) {
        //     userClaimNames = this.userClaims[0].claimNames;
        // }
        // if (Array.isArray(moduleClaims)) {
        //     // const jwtHelper = new JwtHelperService();
        //     // const token = this._user.access_token;
        //     // constle.log(this._user, jwtHelper.decodeToken(token));

        //     return moduleClaims.some(r => {
        //         return userClaimNames.includes(r);
        //         // return this.isLoggedIn() && this.testClaims[moduleName][r] !== undefined;
        //     });
        //     // return this._user && claim.some(r => this._user.profile[r] !== undefined);
        // }
        // return userClaimNames.includes(moduleClaims);
        // return this.isLoggedIn() && this.testClaims[moduleName][moduleClaims] !== undefined;
        // return this._user && this._user.profile[claim] !== undefined;
    }

}
