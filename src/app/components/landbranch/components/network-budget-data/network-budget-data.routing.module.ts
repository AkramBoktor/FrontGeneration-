import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { NetworkBudgetDataGuard } from './shared/network-budget-data.guard';
import { NetworkBudgetDataNewComponent } from './network-budget-data-new/network-budget-data-new.component';
import { NetworkBudgetDataEditComponent } from './network-budget-data-edit/network-budget-data-edit.component';
import { NetworkBudgetDataListComponent } from './network-budget-data-list/network-budget-data-list.component';
import { NetworkBudgetDataViewComponent } from './network-budget-data-view/network-budget-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: NetworkBudgetDataListComponent,
    canActivate: [NetworkBudgetDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: NetworkBudgetDataNewComponent,
    canActivate: [NetworkBudgetDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: NetworkBudgetDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: NetworkBudgetDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: NetworkBudgetDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class NetworkBudgetDataRoutingModule {
}
