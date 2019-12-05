import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CashFormAllowanceGuard } from './shared/cash-form-allowance.guard';
import { CashFormAllowanceNewComponent } from './cash-form-allowance-new/cash-form-allowance-new.component';
import { CashFormAllowanceEditComponent } from './cash-form-allowance-edit/cash-form-allowance-edit.component';
import { CashFormAllowanceListComponent } from './cash-form-allowance-list/cash-form-allowance-list.component';
import { CashFormAllowanceViewComponent } from './cash-form-allowance-view/cash-form-allowance-view.component';

const routes: Routes = [
  {
    path: '',
    component: CashFormAllowanceListComponent,
    canActivate: [CashFormAllowanceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CashFormAllowanceNewComponent,
    canActivate: [CashFormAllowanceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CashFormAllowanceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CashFormAllowanceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CashFormAllowanceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CashFormAllowanceRoutingModule {
}
