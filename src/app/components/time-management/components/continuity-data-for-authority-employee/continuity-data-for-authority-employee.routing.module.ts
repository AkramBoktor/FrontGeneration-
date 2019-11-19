import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ContinuityDataForAuthorityEmployeeGuard } from './shared/continuity-data-for-authority-employee.guard';
import { ContinuityDataForAuthorityEmployeeNewComponent } from './continuity-data-for-authority-employee-new/continuity-data-for-authority-employee-new.component';
import { ContinuityDataForAuthorityEmployeeEditComponent } from './continuity-data-for-authority-employee-edit/continuity-data-for-authority-employee-edit.component';
import { ContinuityDataForAuthorityEmployeeListComponent } from './continuity-data-for-authority-employee-list/continuity-data-for-authority-employee-list.component';
import { ContinuityDataForAuthorityEmployeeViewComponent } from './continuity-data-for-authority-employee-view/continuity-data-for-authority-employee-view.component';

const routes: Routes = [
  {
    path: '',
    component: ContinuityDataForAuthorityEmployeeListComponent,
    canActivate: [ContinuityDataForAuthorityEmployeeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ContinuityDataForAuthorityEmployeeNewComponent,
    canActivate: [ContinuityDataForAuthorityEmployeeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ContinuityDataForAuthorityEmployeeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ContinuityDataForAuthorityEmployeeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ContinuityDataForAuthorityEmployeeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ContinuityDataForAuthorityEmployeeRoutingModule {
}
