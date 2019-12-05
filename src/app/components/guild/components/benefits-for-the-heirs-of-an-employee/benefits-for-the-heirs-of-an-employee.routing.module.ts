import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BenefitsForTheHeirsOfAnEmployeeGuard } from './shared/benefits-for-the-heirs-of-an-employee.guard';
import { BenefitsForTheHeirsOfAnEmployeeNewComponent } from './benefits-for-the-heirs-of-an-employee-new/benefits-for-the-heirs-of-an-employee-new.component';
import { BenefitsForTheHeirsOfAnEmployeeEditComponent } from './benefits-for-the-heirs-of-an-employee-edit/benefits-for-the-heirs-of-an-employee-edit.component';
import { BenefitsForTheHeirsOfAnEmployeeListComponent } from './benefits-for-the-heirs-of-an-employee-list/benefits-for-the-heirs-of-an-employee-list.component';
import { BenefitsForTheHeirsOfAnEmployeeViewComponent } from './benefits-for-the-heirs-of-an-employee-view/benefits-for-the-heirs-of-an-employee-view.component';

const routes: Routes = [
  {
    path: '',
    component: BenefitsForTheHeirsOfAnEmployeeListComponent,
    canActivate: [BenefitsForTheHeirsOfAnEmployeeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BenefitsForTheHeirsOfAnEmployeeNewComponent,
    canActivate: [BenefitsForTheHeirsOfAnEmployeeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BenefitsForTheHeirsOfAnEmployeeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BenefitsForTheHeirsOfAnEmployeeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BenefitsForTheHeirsOfAnEmployeeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BenefitsForTheHeirsOfAnEmployeeRoutingModule {
}
