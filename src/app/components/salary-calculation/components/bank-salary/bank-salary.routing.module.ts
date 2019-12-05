import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BankSalaryGuard } from './shared/bank-salary.guard';
import { BankSalaryNewComponent } from './bank-salary-new/bank-salary-new.component';
import { BankSalaryEditComponent } from './bank-salary-edit/bank-salary-edit.component';
import { BankSalaryListComponent } from './bank-salary-list/bank-salary-list.component';
import { BankSalaryViewComponent } from './bank-salary-view/bank-salary-view.component';

const routes: Routes = [
  {
    path: '',
    component: BankSalaryListComponent,
    canActivate: [BankSalaryGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BankSalaryNewComponent,
    canActivate: [BankSalaryGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BankSalaryEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BankSalaryListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BankSalaryViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BankSalaryRoutingModule {
}
