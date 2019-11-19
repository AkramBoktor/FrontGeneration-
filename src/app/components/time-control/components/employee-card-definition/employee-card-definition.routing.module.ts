import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EmployeeCardDefinitionGuard } from './shared/employee-card-definition.guard';
import { EmployeeCardDefinitionNewComponent } from './employee-card-definition-new/employee-card-definition-new.component';
import { EmployeeCardDefinitionEditComponent } from './employee-card-definition-edit/employee-card-definition-edit.component';
import { EmployeeCardDefinitionListComponent } from './employee-card-definition-list/employee-card-definition-list.component';
import { EmployeeCardDefinitionViewComponent } from './employee-card-definition-view/employee-card-definition-view.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeCardDefinitionListComponent,
    canActivate: [EmployeeCardDefinitionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EmployeeCardDefinitionNewComponent,
    canActivate: [EmployeeCardDefinitionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EmployeeCardDefinitionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EmployeeCardDefinitionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EmployeeCardDefinitionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EmployeeCardDefinitionRoutingModule {
}
