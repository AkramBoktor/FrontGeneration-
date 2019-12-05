import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SocialWelfareForTheHeirsOfAnEmployeeGuard } from './shared/social-welfare-for-the-heirs-of-an-employee.guard';
import { SocialWelfareForTheHeirsOfAnEmployeeNewComponent } from './social-welfare-for-the-heirs-of-an-employee-new/social-welfare-for-the-heirs-of-an-employee-new.component';
import { SocialWelfareForTheHeirsOfAnEmployeeEditComponent } from './social-welfare-for-the-heirs-of-an-employee-edit/social-welfare-for-the-heirs-of-an-employee-edit.component';
import { SocialWelfareForTheHeirsOfAnEmployeeListComponent } from './social-welfare-for-the-heirs-of-an-employee-list/social-welfare-for-the-heirs-of-an-employee-list.component';
import { SocialWelfareForTheHeirsOfAnEmployeeViewComponent } from './social-welfare-for-the-heirs-of-an-employee-view/social-welfare-for-the-heirs-of-an-employee-view.component';

const routes: Routes = [
  {
    path: '',
    component: SocialWelfareForTheHeirsOfAnEmployeeListComponent,
    canActivate: [SocialWelfareForTheHeirsOfAnEmployeeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SocialWelfareForTheHeirsOfAnEmployeeNewComponent,
    canActivate: [SocialWelfareForTheHeirsOfAnEmployeeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SocialWelfareForTheHeirsOfAnEmployeeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SocialWelfareForTheHeirsOfAnEmployeeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SocialWelfareForTheHeirsOfAnEmployeeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SocialWelfareForTheHeirsOfAnEmployeeRoutingModule {
}
