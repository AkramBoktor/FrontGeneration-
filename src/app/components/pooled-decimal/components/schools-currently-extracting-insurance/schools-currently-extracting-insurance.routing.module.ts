import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SchoolsCurrentlyExtractingInsuranceGuard } from './shared/schools-currently-extracting-insurance.guard';
import { SchoolsCurrentlyExtractingInsuranceNewComponent } from './schools-currently-extracting-insurance-new/schools-currently-extracting-insurance-new.component';
import { SchoolsCurrentlyExtractingInsuranceEditComponent } from './schools-currently-extracting-insurance-edit/schools-currently-extracting-insurance-edit.component';
import { SchoolsCurrentlyExtractingInsuranceListComponent } from './schools-currently-extracting-insurance-list/schools-currently-extracting-insurance-list.component';
import { SchoolsCurrentlyExtractingInsuranceViewComponent } from './schools-currently-extracting-insurance-view/schools-currently-extracting-insurance-view.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolsCurrentlyExtractingInsuranceListComponent,
    canActivate: [SchoolsCurrentlyExtractingInsuranceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SchoolsCurrentlyExtractingInsuranceNewComponent,
    canActivate: [SchoolsCurrentlyExtractingInsuranceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SchoolsCurrentlyExtractingInsuranceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SchoolsCurrentlyExtractingInsuranceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SchoolsCurrentlyExtractingInsuranceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SchoolsCurrentlyExtractingInsuranceRoutingModule {
}
