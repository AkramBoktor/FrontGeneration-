import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AbstractSalaryGuard } from './shared/abstract-salary.guard';
import { AbstractSalaryNewComponent } from './abstract-salary-new/abstract-salary-new.component';
import { AbstractSalaryEditComponent } from './abstract-salary-edit/abstract-salary-edit.component';
import { AbstractSalaryListComponent } from './abstract-salary-list/abstract-salary-list.component';
import { AbstractSalaryViewComponent } from './abstract-salary-view/abstract-salary-view.component';

const routes: Routes = [
  {
    path: '',
    component: AbstractSalaryListComponent,
    canActivate: [AbstractSalaryGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AbstractSalaryNewComponent,
    canActivate: [AbstractSalaryGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AbstractSalaryEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AbstractSalaryListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AbstractSalaryViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AbstractSalaryRoutingModule {
}
