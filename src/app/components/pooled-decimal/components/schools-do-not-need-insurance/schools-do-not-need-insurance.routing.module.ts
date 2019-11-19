import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SchoolsDoNotNeedInsuranceGuard } from './shared/schools-do-not-need-insurance.guard';
import { SchoolsDoNotNeedInsuranceNewComponent } from './schools-do-not-need-insurance-new/schools-do-not-need-insurance-new.component';
import { SchoolsDoNotNeedInsuranceEditComponent } from './schools-do-not-need-insurance-edit/schools-do-not-need-insurance-edit.component';
import { SchoolsDoNotNeedInsuranceListComponent } from './schools-do-not-need-insurance-list/schools-do-not-need-insurance-list.component';
import { SchoolsDoNotNeedInsuranceViewComponent } from './schools-do-not-need-insurance-view/schools-do-not-need-insurance-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolsDoNotNeedInsuranceListComponent,
    canActivate: [SchoolsDoNotNeedInsuranceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SchoolsDoNotNeedInsuranceNewComponent,
    canActivate: [SchoolsDoNotNeedInsuranceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SchoolsDoNotNeedInsuranceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SchoolsDoNotNeedInsuranceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SchoolsDoNotNeedInsuranceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SchoolsDoNotNeedInsuranceRoutingModule {
}
