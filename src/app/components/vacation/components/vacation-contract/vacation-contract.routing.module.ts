import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { VacationContractGuard } from './shared/vacation-contract.guard';
import { VacationContractNewComponent } from './vacation-contract-new/vacation-contract-new.component';
import { VacationContractEditComponent } from './vacation-contract-edit/vacation-contract-edit.component';
import { VacationContractListComponent } from './vacation-contract-list/vacation-contract-list.component';
import { VacationContractViewComponent } from './vacation-contract-view/vacation-contract-view.component';

const routes: Routes = [
  {
    path: '',
    component: VacationContractListComponent,
    canActivate: [VacationContractGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: VacationContractNewComponent,
    canActivate: [VacationContractGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: VacationContractEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: VacationContractListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: VacationContractViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class VacationContractRoutingModule {
}
