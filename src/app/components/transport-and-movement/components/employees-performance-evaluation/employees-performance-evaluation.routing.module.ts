import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EmployeesPerformanceEvaluationGuard } from './shared/employees-performance-evaluation.guard';
import { EmployeesPerformanceEvaluationNewComponent } from './employees-performance-evaluation-new/employees-performance-evaluation-new.component';
import { EmployeesPerformanceEvaluationEditComponent } from './employees-performance-evaluation-edit/employees-performance-evaluation-edit.component';
import { EmployeesPerformanceEvaluationListComponent } from './employees-performance-evaluation-list/employees-performance-evaluation-list.component';
import { EmployeesPerformanceEvaluationViewComponent } from './employees-performance-evaluation-view/employees-performance-evaluation-view.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesPerformanceEvaluationListComponent,
    canActivate: [EmployeesPerformanceEvaluationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeesPerformanceEvaluationNewComponent,
    canActivate: [EmployeesPerformanceEvaluationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeesPerformanceEvaluationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeesPerformanceEvaluationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeesPerformanceEvaluationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeesPerformanceEvaluationRoutingModule {
}
