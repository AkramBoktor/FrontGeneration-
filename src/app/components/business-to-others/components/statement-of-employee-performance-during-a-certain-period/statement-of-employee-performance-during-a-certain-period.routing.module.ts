import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { StatementOfEmployeePerformanceDuringACertainPeriodGuard } from './shared/statement-of-employee-performance-during-a-certain-period.guard';
import { StatementOfEmployeePerformanceDuringACertainPeriodNewComponent } from './statement-of-employee-performance-during-a-certain-period-new/statement-of-employee-performance-during-a-certain-period-new.component';
import { StatementOfEmployeePerformanceDuringACertainPeriodEditComponent } from './statement-of-employee-performance-during-a-certain-period-edit/statement-of-employee-performance-during-a-certain-period-edit.component';
import { StatementOfEmployeePerformanceDuringACertainPeriodListComponent } from './statement-of-employee-performance-during-a-certain-period-list/statement-of-employee-performance-during-a-certain-period-list.component';
import { StatementOfEmployeePerformanceDuringACertainPeriodViewComponent } from './statement-of-employee-performance-during-a-certain-period-view/statement-of-employee-performance-during-a-certain-period-view.component';

const routes: Routes = [
  {
    path: '',
    component: StatementOfEmployeePerformanceDuringACertainPeriodListComponent,
    canActivate: [StatementOfEmployeePerformanceDuringACertainPeriodGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: StatementOfEmployeePerformanceDuringACertainPeriodNewComponent,
    canActivate: [StatementOfEmployeePerformanceDuringACertainPeriodGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: StatementOfEmployeePerformanceDuringACertainPeriodEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: StatementOfEmployeePerformanceDuringACertainPeriodListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: StatementOfEmployeePerformanceDuringACertainPeriodViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class StatementOfEmployeePerformanceDuringACertainPeriodRoutingModule {
}
