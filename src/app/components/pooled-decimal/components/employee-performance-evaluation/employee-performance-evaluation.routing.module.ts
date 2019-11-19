import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EmployeePerformanceEvaluationGuard } from './shared/employee-performance-evaluation.guard';
import { EmployeePerformanceEvaluationNewComponent } from './employee-performance-evaluation-new/employee-performance-evaluation-new.component';
import { EmployeePerformanceEvaluationEditComponent } from './employee-performance-evaluation-edit/employee-performance-evaluation-edit.component';
import { EmployeePerformanceEvaluationListComponent } from './employee-performance-evaluation-list/employee-performance-evaluation-list.component';
import { EmployeePerformanceEvaluationViewComponent } from './employee-performance-evaluation-view/employee-performance-evaluation-view.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeePerformanceEvaluationListComponent,
    canActivate: [EmployeePerformanceEvaluationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeePerformanceEvaluationNewComponent,
    canActivate: [EmployeePerformanceEvaluationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeePerformanceEvaluationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeePerformanceEvaluationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeePerformanceEvaluationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeePerformanceEvaluationRoutingModule {
}
