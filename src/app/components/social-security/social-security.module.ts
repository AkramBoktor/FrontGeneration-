
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SocialSecurityComponent } from './social-security.component';
import { SocialSecurityRoutingModule } from './social-security.routing.module';

@NgModule({
  declarations: [SocialSecurityComponent],
  imports: [
    SocialSecurityRoutingModule,
    CommonModule,
  ]
})
export class SocialSecurityModule { }
