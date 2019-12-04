import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PasswordForTheSupervisorEngineerGuard } from './shared/password-for-the-supervisor-engineer.guard';
import { PasswordForTheSupervisorEngineerNewComponent } from './password-for-the-supervisor-engineer-new/password-for-the-supervisor-engineer-new.component';
import { PasswordForTheSupervisorEngineerEditComponent } from './password-for-the-supervisor-engineer-edit/password-for-the-supervisor-engineer-edit.component';
import { PasswordForTheSupervisorEngineerListComponent } from './password-for-the-supervisor-engineer-list/password-for-the-supervisor-engineer-list.component';
import { PasswordForTheSupervisorEngineerViewComponent } from './password-for-the-supervisor-engineer-view/password-for-the-supervisor-engineer-view.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordForTheSupervisorEngineerListComponent,
    canActivate: [PasswordForTheSupervisorEngineerGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PasswordForTheSupervisorEngineerNewComponent,
    canActivate: [PasswordForTheSupervisorEngineerGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PasswordForTheSupervisorEngineerEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PasswordForTheSupervisorEngineerListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PasswordForTheSupervisorEngineerViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PasswordForTheSupervisorEngineerRoutingModule {
}
