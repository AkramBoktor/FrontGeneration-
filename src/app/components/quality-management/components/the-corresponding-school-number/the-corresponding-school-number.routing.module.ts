import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TheCorrespondingSchoolNumberGuard } from './shared/the-corresponding-school-number.guard';
import { TheCorrespondingSchoolNumberNewComponent } from './the-corresponding-school-number-new/the-corresponding-school-number-new.component';
import { TheCorrespondingSchoolNumberEditComponent } from './the-corresponding-school-number-edit/the-corresponding-school-number-edit.component';
import { TheCorrespondingSchoolNumberListComponent } from './the-corresponding-school-number-list/the-corresponding-school-number-list.component';
import { TheCorrespondingSchoolNumberViewComponent } from './the-corresponding-school-number-view/the-corresponding-school-number-view.component';

const routes: Routes = [
  {
    path: '',
    component: TheCorrespondingSchoolNumberListComponent,
    canActivate: [TheCorrespondingSchoolNumberGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TheCorrespondingSchoolNumberNewComponent,
    canActivate: [TheCorrespondingSchoolNumberGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TheCorrespondingSchoolNumberEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TheCorrespondingSchoolNumberListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TheCorrespondingSchoolNumberViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TheCorrespondingSchoolNumberRoutingModule {
}
