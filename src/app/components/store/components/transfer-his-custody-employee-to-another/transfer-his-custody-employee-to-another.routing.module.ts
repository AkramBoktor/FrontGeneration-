import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TransferHisCustodyEmployeeToAnotherGuard } from './shared/transfer-his-custody-employee-to-another.guard';
import { TransferHisCustodyEmployeeToAnotherNewComponent } from './transfer-his-custody-employee-to-another-new/transfer-his-custody-employee-to-another-new.component';
import { TransferHisCustodyEmployeeToAnotherEditComponent } from './transfer-his-custody-employee-to-another-edit/transfer-his-custody-employee-to-another-edit.component';
import { TransferHisCustodyEmployeeToAnotherListComponent } from './transfer-his-custody-employee-to-another-list/transfer-his-custody-employee-to-another-list.component';
import { TransferHisCustodyEmployeeToAnotherViewComponent } from './transfer-his-custody-employee-to-another-view/transfer-his-custody-employee-to-another-view.component';

const routes: Routes = [
  {
    path: '',
    component: TransferHisCustodyEmployeeToAnotherListComponent,
    canActivate: [TransferHisCustodyEmployeeToAnotherGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TransferHisCustodyEmployeeToAnotherNewComponent,
    canActivate: [TransferHisCustodyEmployeeToAnotherGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TransferHisCustodyEmployeeToAnotherEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TransferHisCustodyEmployeeToAnotherListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TransferHisCustodyEmployeeToAnotherViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TransferHisCustodyEmployeeToAnotherRoutingModule {
}
