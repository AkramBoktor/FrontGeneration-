import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ContractorsClaimGuard } from './shared/contractors-claim.guard';
import { ContractorsClaimNewComponent } from './contractors-claim-new/contractors-claim-new.component';
import { ContractorsClaimEditComponent } from './contractors-claim-edit/contractors-claim-edit.component';
import { ContractorsClaimListComponent } from './contractors-claim-list/contractors-claim-list.component';
import { ContractorsClaimViewComponent } from './contractors-claim-view/contractors-claim-view.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorsClaimListComponent,
    canActivate: [ContractorsClaimGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ContractorsClaimNewComponent,
    canActivate: [ContractorsClaimGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ContractorsClaimEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ContractorsClaimListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ContractorsClaimViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ContractorsClaimRoutingModule {
}
