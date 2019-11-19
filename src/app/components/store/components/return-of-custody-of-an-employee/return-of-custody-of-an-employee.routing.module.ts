import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ReturnOfCustodyOfAnEmployeeGuard } from './shared/return-of-custody-of-an-employee.guard';
import { ReturnOfCustodyOfAnEmployeeNewComponent } from './return-of-custody-of-an-employee-new/return-of-custody-of-an-employee-new.component';
import { ReturnOfCustodyOfAnEmployeeEditComponent } from './return-of-custody-of-an-employee-edit/return-of-custody-of-an-employee-edit.component';
import { ReturnOfCustodyOfAnEmployeeListComponent } from './return-of-custody-of-an-employee-list/return-of-custody-of-an-employee-list.component';
import { ReturnOfCustodyOfAnEmployeeViewComponent } from './return-of-custody-of-an-employee-view/return-of-custody-of-an-employee-view.component';

const routes: Routes = [
  {
    path: '',
    component: ReturnOfCustodyOfAnEmployeeListComponent,
    canActivate: [ReturnOfCustodyOfAnEmployeeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ReturnOfCustodyOfAnEmployeeNewComponent,
    canActivate: [ReturnOfCustodyOfAnEmployeeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ReturnOfCustodyOfAnEmployeeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ReturnOfCustodyOfAnEmployeeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ReturnOfCustodyOfAnEmployeeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ReturnOfCustodyOfAnEmployeeRoutingModule {
}
