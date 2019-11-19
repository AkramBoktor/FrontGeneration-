import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ContractorDurationsGuard } from './shared/contractor-durations.guard';
import { ContractorDurationsNewComponent } from './contractor-durations-new/contractor-durations-new.component';
import { ContractorDurationsEditComponent } from './contractor-durations-edit/contractor-durations-edit.component';
import { ContractorDurationsListComponent } from './contractor-durations-list/contractor-durations-list.component';
import { ContractorDurationsViewComponent } from './contractor-durations-view/contractor-durations-view.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorDurationsListComponent,
    canActivate: [ContractorDurationsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ContractorDurationsNewComponent,
    canActivate: [ContractorDurationsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ContractorDurationsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ContractorDurationsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ContractorDurationsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ContractorDurationsRoutingModule {
}
