import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBGuard } from './shared/deduction-of-an-amount-to-an-employee-of-the-fund-b.guard';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBNewComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-b-new/deduction-of-an-amount-to-an-employee-of-the-fund-b-new.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBEditComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-b-edit/deduction-of-an-amount-to-an-employee-of-the-fund-b-edit.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBListComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-b-list/deduction-of-an-amount-to-an-employee-of-the-fund-b-list.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundBViewComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-b-view/deduction-of-an-amount-to-an-employee-of-the-fund-b-view.component';

const routes: Routes = [
  {
    path: '',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundBListComponent,
    canActivate: [DeductionOfAnAmountToAnEmployeeOfTheFundBGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundBNewComponent,
    canActivate: [DeductionOfAnAmountToAnEmployeeOfTheFundBGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundBEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundBListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundBViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundBRoutingModule {
}
