import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractTerminationEditComponent } from './contract-termination-edit/contract-termination-edit.component';
import { ContractTerminationListComponent } from './contract-termination-list/contract-termination-list.component';
import { ContractTerminationNewComponent } from './contract-termination-new/contract-termination-new.component';
import { ContractTerminationViewComponent } from './contract-termination-view/contract-termination-view.component';
import { ContractTerminationGuard } from './shared/contract-termination.guard';

const routes: Routes = [
  {
    path: '',
    component: ContractTerminationListComponent,
    canActivate: [ContractTerminationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ContractTerminationNewComponent,
    canActivate: [ContractTerminationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ContractTerminationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ContractTerminationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ContractTerminationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ContractTerminationRoutingModule {
}
