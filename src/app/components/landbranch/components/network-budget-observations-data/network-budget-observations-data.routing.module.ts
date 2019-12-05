import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { NetworkBudgetObservationsDataGuard } from './shared/network-budget-observations-data.guard';
import { NetworkBudgetObservationsDataNewComponent } from './network-budget-observations-data-new/network-budget-observations-data-new.component';
import { NetworkBudgetObservationsDataEditComponent } from './network-budget-observations-data-edit/network-budget-observations-data-edit.component';
import { NetworkBudgetObservationsDataListComponent } from './network-budget-observations-data-list/network-budget-observations-data-list.component';
import { NetworkBudgetObservationsDataViewComponent } from './network-budget-observations-data-view/network-budget-observations-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: NetworkBudgetObservationsDataListComponent,
    canActivate: [NetworkBudgetObservationsDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: NetworkBudgetObservationsDataNewComponent,
    canActivate: [NetworkBudgetObservationsDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: NetworkBudgetObservationsDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: NetworkBudgetObservationsDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: NetworkBudgetObservationsDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class NetworkBudgetObservationsDataRoutingModule {
}
