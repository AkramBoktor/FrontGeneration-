import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PrimaryAndFinalDeliveryDateGuard } from './shared/primary-and-final-delivery-date.guard';
import { PrimaryAndFinalDeliveryDateNewComponent } from './primary-and-final-delivery-date-new/primary-and-final-delivery-date-new.component';
import { PrimaryAndFinalDeliveryDateEditComponent } from './primary-and-final-delivery-date-edit/primary-and-final-delivery-date-edit.component';
import { PrimaryAndFinalDeliveryDateListComponent } from './primary-and-final-delivery-date-list/primary-and-final-delivery-date-list.component';
import { PrimaryAndFinalDeliveryDateViewComponent } from './primary-and-final-delivery-date-view/primary-and-final-delivery-date-view.component';

const routes: Routes = [
  {
    path: '',
    component: PrimaryAndFinalDeliveryDateListComponent,
    canActivate: [PrimaryAndFinalDeliveryDateGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PrimaryAndFinalDeliveryDateNewComponent,
    canActivate: [PrimaryAndFinalDeliveryDateGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PrimaryAndFinalDeliveryDateEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PrimaryAndFinalDeliveryDateListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PrimaryAndFinalDeliveryDateViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PrimaryAndFinalDeliveryDateRoutingModule {
}
