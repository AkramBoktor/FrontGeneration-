import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGGuard } from './shared/deduction-of-an-amount-to-an-employee-of-the-fund-g.guard';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGNewComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-g-new/deduction-of-an-amount-to-an-employee-of-the-fund-g-new.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGEditComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-g-edit/deduction-of-an-amount-to-an-employee-of-the-fund-g-edit.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGListComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-g-list/deduction-of-an-amount-to-an-employee-of-the-fund-g-list.component';
import { DeductionOfAnAmountToAnEmployeeOfTheFundGViewComponent } from './deduction-of-an-amount-to-an-employee-of-the-fund-g-view/deduction-of-an-amount-to-an-employee-of-the-fund-g-view.component';

const routes: Routes = [
  {
    path: '',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundGListComponent,
    canActivate: [DeductionOfAnAmountToAnEmployeeOfTheFundGGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundGNewComponent,
    canActivate: [DeductionOfAnAmountToAnEmployeeOfTheFundGGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundGEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundGListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DeductionOfAnAmountToAnEmployeeOfTheFundGViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DeductionOfAnAmountToAnEmployeeOfTheFundGRoutingModule {
}
