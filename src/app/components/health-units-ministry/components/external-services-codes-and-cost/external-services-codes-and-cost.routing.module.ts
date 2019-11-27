import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExternalServicesCodesAndCostGuard } from './shared/external-services-codes-and-cost.guard';
import { ExternalServicesCodesAndCostNewComponent } from './external-services-codes-and-cost-new/external-services-codes-and-cost-new.component';
import { ExternalServicesCodesAndCostEditComponent } from './external-services-codes-and-cost-edit/external-services-codes-and-cost-edit.component';
import { ExternalServicesCodesAndCostListComponent } from './external-services-codes-and-cost-list/external-services-codes-and-cost-list.component';
import { ExternalServicesCodesAndCostViewComponent } from './external-services-codes-and-cost-view/external-services-codes-and-cost-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExternalServicesCodesAndCostListComponent,
    canActivate: [ExternalServicesCodesAndCostGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExternalServicesCodesAndCostNewComponent,
    canActivate: [ExternalServicesCodesAndCostGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExternalServicesCodesAndCostEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExternalServicesCodesAndCostListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExternalServicesCodesAndCostViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExternalServicesCodesAndCostRoutingModule {
}
