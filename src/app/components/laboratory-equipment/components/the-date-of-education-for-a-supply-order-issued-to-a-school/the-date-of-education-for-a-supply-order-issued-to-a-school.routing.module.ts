import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolGuard } from './shared/the-date-of-education-for-a-supply-order-issued-to-a-school.guard';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolNewComponent } from './the-date-of-education-for-a-supply-order-issued-to-a-school-new/the-date-of-education-for-a-supply-order-issued-to-a-school-new.component';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolEditComponent } from './the-date-of-education-for-a-supply-order-issued-to-a-school-edit/the-date-of-education-for-a-supply-order-issued-to-a-school-edit.component';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolListComponent } from './the-date-of-education-for-a-supply-order-issued-to-a-school-list/the-date-of-education-for-a-supply-order-issued-to-a-school-list.component';
import { TheDateOfEducationForASupplyOrderIssuedToASchoolViewComponent } from './the-date-of-education-for-a-supply-order-issued-to-a-school-view/the-date-of-education-for-a-supply-order-issued-to-a-school-view.component';

const routes: Routes = [
  {
    path: '',
    component: TheDateOfEducationForASupplyOrderIssuedToASchoolListComponent,
    canActivate: [TheDateOfEducationForASupplyOrderIssuedToASchoolGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TheDateOfEducationForASupplyOrderIssuedToASchoolNewComponent,
    canActivate: [TheDateOfEducationForASupplyOrderIssuedToASchoolGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TheDateOfEducationForASupplyOrderIssuedToASchoolEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TheDateOfEducationForASupplyOrderIssuedToASchoolListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TheDateOfEducationForASupplyOrderIssuedToASchoolViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TheDateOfEducationForASupplyOrderIssuedToASchoolRoutingModule {
}
