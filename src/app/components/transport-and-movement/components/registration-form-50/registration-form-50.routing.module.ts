import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RegistrationForm50Guard } from './shared/registration-form-50.guard';
import { RegistrationForm50NewComponent } from './registration-form-50-new/registration-form-50-new.component';
import { RegistrationForm50EditComponent } from './registration-form-50-edit/registration-form-50-edit.component';
import { RegistrationForm50ListComponent } from './registration-form-50-list/registration-form-50-list.component';
import { RegistrationForm50ViewComponent } from './registration-form-50-view/registration-form-50-view.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationForm50ListComponent,
    canActivate: [RegistrationForm50Guard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RegistrationForm50NewComponent,
    canActivate: [RegistrationForm50Guard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RegistrationForm50EditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RegistrationForm50ListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RegistrationForm50ViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RegistrationForm50RoutingModule {
}
