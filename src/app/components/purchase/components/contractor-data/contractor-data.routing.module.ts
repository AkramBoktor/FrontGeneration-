import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ContractorDataGuard } from './shared/contractor-data.guard';
import { ContractorDataNewComponent } from './contractor-data-new/contractor-data-new.component';
import { ContractorDataEditComponent } from './contractor-data-edit/contractor-data-edit.component';
import { ContractorDataListComponent } from './contractor-data-list/contractor-data-list.component';
import { ContractorDataViewComponent } from './contractor-data-view/contractor-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorDataListComponent,
    canActivate: [ContractorDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ContractorDataNewComponent,
    canActivate: [ContractorDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ContractorDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ContractorDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ContractorDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ContractorDataRoutingModule {
}
