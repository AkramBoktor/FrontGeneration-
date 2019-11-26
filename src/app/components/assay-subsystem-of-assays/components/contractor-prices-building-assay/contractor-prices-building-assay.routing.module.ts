import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ContractorPricesBuildingAssayGuard } from './shared/contractor-prices-building-assay.guard';
import { ContractorPricesBuildingAssayNewComponent } from './contractor-prices-building-assay-new/contractor-prices-building-assay-new.component';
import { ContractorPricesBuildingAssayEditComponent } from './contractor-prices-building-assay-edit/contractor-prices-building-assay-edit.component';
import { ContractorPricesBuildingAssayListComponent } from './contractor-prices-building-assay-list/contractor-prices-building-assay-list.component';
import { ContractorPricesBuildingAssayViewComponent } from './contractor-prices-building-assay-view/contractor-prices-building-assay-view.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorPricesBuildingAssayListComponent,
    canActivate: [ContractorPricesBuildingAssayGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ContractorPricesBuildingAssayNewComponent,
    canActivate: [ContractorPricesBuildingAssayGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ContractorPricesBuildingAssayEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ContractorPricesBuildingAssayListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ContractorPricesBuildingAssayViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ContractorPricesBuildingAssayRoutingModule {
}
