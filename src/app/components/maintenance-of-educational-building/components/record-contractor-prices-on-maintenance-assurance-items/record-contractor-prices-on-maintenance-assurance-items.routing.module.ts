import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RecordContractorPricesOnMaintenanceAssuranceItemsGuard } from './shared/record-contractor-prices-on-maintenance-assurance-items.guard';
import { RecordContractorPricesOnMaintenanceAssuranceItemsNewComponent } from './record-contractor-prices-on-maintenance-assurance-items-new/record-contractor-prices-on-maintenance-assurance-items-new.component';
import { RecordContractorPricesOnMaintenanceAssuranceItemsEditComponent } from './record-contractor-prices-on-maintenance-assurance-items-edit/record-contractor-prices-on-maintenance-assurance-items-edit.component';
import { RecordContractorPricesOnMaintenanceAssuranceItemsListComponent } from './record-contractor-prices-on-maintenance-assurance-items-list/record-contractor-prices-on-maintenance-assurance-items-list.component';
import { RecordContractorPricesOnMaintenanceAssuranceItemsViewComponent } from './record-contractor-prices-on-maintenance-assurance-items-view/record-contractor-prices-on-maintenance-assurance-items-view.component';

const routes: Routes = [
  {
    path: '',
    component: RecordContractorPricesOnMaintenanceAssuranceItemsListComponent,
    canActivate: [RecordContractorPricesOnMaintenanceAssuranceItemsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RecordContractorPricesOnMaintenanceAssuranceItemsNewComponent,
    canActivate: [RecordContractorPricesOnMaintenanceAssuranceItemsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RecordContractorPricesOnMaintenanceAssuranceItemsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RecordContractorPricesOnMaintenanceAssuranceItemsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RecordContractorPricesOnMaintenanceAssuranceItemsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RecordContractorPricesOnMaintenanceAssuranceItemsRoutingModule {
}
