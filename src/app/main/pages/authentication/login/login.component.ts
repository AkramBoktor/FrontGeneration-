import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    ReturnUrl: string;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _route: ActivatedRoute
    )
    {
        
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        _route.queryParams.subscribe(params => {
            this.ReturnUrl = params['ReturnUrl'];
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            Username   : ['', [Validators.required, Validators.email]],
            Password: ['', Validators.required]
        });
    }

    login(){
        this._authService.login2({
            Username : this.loginForm.value.Username, 
            Password : this.loginForm.value.Password,
            ReturnUrl: this.ReturnUrl}).subscribe(
            a => {
                console.log(this.ReturnUrl);
            }
        );
    }

    test(){
        this._authService.login().then(a => console.log(a));
    }
    test2(){
        this._authService.isLoggedIn();
    }
}
