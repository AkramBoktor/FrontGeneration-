import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAGuard } from './shared/deduction-of-an-amount-to-an-employee-of-the-fund-a.guard';
import { DeductionOfAnAmountToAnEmployeeOfTheFundANewComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-a-new/deduction-of-an-amount-to-an-employee-of-the-fund-a-new.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAEditComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-a-edit/deduction-of-an-amount-to-an-employee-of-the-fund-a-edit.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAListComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-a-list/deduction-of-an-amount-to-an-employee-of-the-fund-a-list.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundAViewComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-a-view/deduction-of-an-amount-to-an-employee-of-the-fund-a-view.component';

const routes: Routes = [
  {
    path: '',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundAListComponent,
    canActivate: [DeductionOfAnAmountToAnEmployeeOfTheFundAGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundANewComponent,
    canActivate: [DeductionOfAnAmountToAnEmployeeOfTheFundAGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundAEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundAListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundAViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundARoutingModule {
}
