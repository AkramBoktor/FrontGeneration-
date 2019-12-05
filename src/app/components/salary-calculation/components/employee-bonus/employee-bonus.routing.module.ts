import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EmployeeBonusGuard } from './shared/employee-bonus.guard';
import { EmployeeBonusNewComponent } from './employee-bonus-new/employee-bonus-new.component';
import { EmployeeBonusEditComponent } from './employee-bonus-edit/employee-bonus-edit.component';
import { EmployeeBonusListComponent } from './employee-bonus-list/employee-bonus-list.component';
import { EmployeeBonusViewComponent } from './employee-bonus-view/employee-bonus-view.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeBonusListComponent,
    canActivate: [EmployeeBonusGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeeBonusNewComponent,
    canActivate: [EmployeeBonusGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeeBonusEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeeBonusListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeeBonusViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeeBonusRoutingModule {
}
