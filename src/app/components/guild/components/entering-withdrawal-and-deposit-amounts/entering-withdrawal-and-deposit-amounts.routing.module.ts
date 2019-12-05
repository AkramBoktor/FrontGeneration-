import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EnteringWithdrawalAndDepositAmountsGuard } from './shared/entering-withdrawal-and-deposit-amounts.guard';
import { EnteringWithdrawalAndDepositAmountsNewComponent } from './entering-withdrawal-and-deposit-amounts-new/entering-withdrawal-and-deposit-amounts-new.component';
import { EnteringWithdrawalAndDepositAmountsEditComponent } from './entering-withdrawal-and-deposit-amounts-edit/entering-withdrawal-and-deposit-amounts-edit.component';
import { EnteringWithdrawalAndDepositAmountsListComponent } from './entering-withdrawal-and-deposit-amounts-list/entering-withdrawal-and-deposit-amounts-list.component';
import { EnteringWithdrawalAndDepositAmountsViewComponent } from './entering-withdrawal-and-deposit-amounts-view/entering-withdrawal-and-deposit-amounts-view.component';

const routes: Routes = [
  {
    path: '',
    component: EnteringWithdrawalAndDepositAmountsListComponent,
    canActivate: [EnteringWithdrawalAndDepositAmountsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EnteringWithdrawalAndDepositAmountsNewComponent,
    canActivate: [EnteringWithdrawalAndDepositAmountsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EnteringWithdrawalAndDepositAmountsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EnteringWithdrawalAndDepositAmountsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EnteringWithdrawalAndDepositAmountsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EnteringWithdrawalAndDepositAmountsRoutingModule {
}
