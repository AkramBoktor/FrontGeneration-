import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CompleteInsuranceDataOnASchoolGuard } from './shared/complete-insurance-data-on-a-school.guard';
import { CompleteInsuranceDataOnASchoolNewComponent } from './complete-insurance-data-on-a-school-new/complete-insurance-data-on-a-school-new.component';
import { CompleteInsuranceDataOnASchoolEditComponent } from './complete-insurance-data-on-a-school-edit/complete-insurance-data-on-a-school-edit.component';
import { CompleteInsuranceDataOnASchoolListComponent } from './complete-insurance-data-on-a-school-list/complete-insurance-data-on-a-school-list.component';
import { CompleteInsuranceDataOnASchoolViewComponent } from './complete-insurance-data-on-a-school-view/complete-insurance-data-on-a-school-view.component';

const routes: Routes = [
  {
    path: '',
    component: CompleteInsuranceDataOnASchoolListComponent,
    canActivate: [CompleteInsuranceDataOnASchoolGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CompleteInsuranceDataOnASchoolNewComponent,
    canActivate: [CompleteInsuranceDataOnASchoolGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CompleteInsuranceDataOnASchoolEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CompleteInsuranceDataOnASchoolListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CompleteInsuranceDataOnASchoolViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CompleteInsuranceDataOnASchoolRoutingModule {
}
