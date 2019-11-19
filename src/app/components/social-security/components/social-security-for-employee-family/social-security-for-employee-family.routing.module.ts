import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SocialSecurityForEmployeeFamilyGuard } from './shared/social-security-for-employee-family.guard';
import { SocialSecurityForEmployeeFamilyNewComponent } from './social-security-for-employee-family-new/social-security-for-employee-family-new.component';
import { SocialSecurityForEmployeeFamilyEditComponent } from './social-security-for-employee-family-edit/social-security-for-employee-family-edit.component';
import { SocialSecurityForEmployeeFamilyListComponent } from './social-security-for-employee-family-list/social-security-for-employee-family-list.component';
import { SocialSecurityForEmployeeFamilyViewComponent } from './social-security-for-employee-family-view/social-security-for-employee-family-view.component';

const routes: Routes = [
  {
    path: '',
    component: SocialSecurityForEmployeeFamilyListComponent,
    canActivate: [SocialSecurityForEmployeeFamilyGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SocialSecurityForEmployeeFamilyNewComponent,
    canActivate: [SocialSecurityForEmployeeFamilyGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SocialSecurityForEmployeeFamilyEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SocialSecurityForEmployeeFamilyListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SocialSecurityForEmployeeFamilyViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SocialSecurityForEmployeeFamilyRoutingModule {
}
