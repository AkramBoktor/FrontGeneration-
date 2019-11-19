import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DeductionOfAmountToAnEmployeeOfTheFundGuard } from './shared/deduction-of-amount-to-an-employee-of-the-fund.guard';
import { DeductionOfAmountToAnEmployeeOfTheFundNewComponent } from './deduction-of-amount-to-an-employee-of-the-fund-new/deduction-of-amount-to-an-employee-of-the-fund-new.component';
import { DeductionOfAmountToAnEmployeeOfTheFundEditComponent } from './deduction-of-amount-to-an-employee-of-the-fund-edit/deduction-of-amount-to-an-employee-of-the-fund-edit.component';
import { DeductionOfAmountToAnEmployeeOfTheFundListComponent } from './deduction-of-amount-to-an-employee-of-the-fund-list/deduction-of-amount-to-an-employee-of-the-fund-list.component';
import { DeductionOfAmountToAnEmployeeOfTheFundViewComponent } from './deduction-of-amount-to-an-employee-of-the-fund-view/deduction-of-amount-to-an-employee-of-the-fund-view.component';

const routes: Routes = [
  {
    path: '',
    component: DeductionOfAmountToAnEmployeeOfTheFundListComponent,
    canActivate: [DeductionOfAmountToAnEmployeeOfTheFundGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DeductionOfAmountToAnEmployeeOfTheFundNewComponent,
    canActivate: [DeductionOfAmountToAnEmployeeOfTheFundGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DeductionOfAmountToAnEmployeeOfTheFundEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DeductionOfAmountToAnEmployeeOfTheFundListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DeductionOfAmountToAnEmployeeOfTheFundViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DeductionOfAmountToAnEmployeeOfTheFundRoutingModule {
}
