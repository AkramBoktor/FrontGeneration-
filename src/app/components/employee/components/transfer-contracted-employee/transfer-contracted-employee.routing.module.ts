import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TransferContractedEmployeeGuard } from './shared/transfer-contracted-employee.guard';
import { TransferContractedEmployeeNewComponent } from './transfer-contracted-employee-new/transfer-contracted-employee-new.component';
import { TransferContractedEmployeeEditComponent } from './transfer-contracted-employee-edit/transfer-contracted-employee-edit.component';
import { TransferContractedEmployeeListComponent } from './transfer-contracted-employee-list/transfer-contracted-employee-list.component';
import { TransferContractedEmployeeViewComponent } from './transfer-contracted-employee-view/transfer-contracted-employee-view.component';

const routes: Routes = [
  {
    path: '',
    component: TransferContractedEmployeeListComponent,
    canActivate: [TransferContractedEmployeeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TransferContractedEmployeeNewComponent,
    canActivate: [TransferContractedEmployeeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TransferContractedEmployeeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TransferContractedEmployeeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TransferContractedEmployeeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TransferContractedEmployeeRoutingModule {
}
