import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TypicalDeliveryDateForASupplyOrderGuard } from './shared/typical-delivery-date-for-a-supply-order.guard';
import { TypicalDeliveryDateForASupplyOrderNewComponent } from './typical-delivery-date-for-a-supply-order-new/typical-delivery-date-for-a-supply-order-new.component';
import { TypicalDeliveryDateForASupplyOrderEditComponent } from './typical-delivery-date-for-a-supply-order-edit/typical-delivery-date-for-a-supply-order-edit.component';
import { TypicalDeliveryDateForASupplyOrderListComponent } from './typical-delivery-date-for-a-supply-order-list/typical-delivery-date-for-a-supply-order-list.component';
import { TypicalDeliveryDateForASupplyOrderViewComponent } from './typical-delivery-date-for-a-supply-order-view/typical-delivery-date-for-a-supply-order-view.component';

const routes: Routes = [
  {
    path: '',
    component: TypicalDeliveryDateForASupplyOrderListComponent,
    canActivate: [TypicalDeliveryDateForASupplyOrderGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: TypicalDeliveryDateForASupplyOrderNewComponent,
    canActivate: [TypicalDeliveryDateForASupplyOrderGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: TypicalDeliveryDateForASupplyOrderEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: TypicalDeliveryDateForASupplyOrderListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: TypicalDeliveryDateForASupplyOrderViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TypicalDeliveryDateForASupplyOrderRoutingModule {
}
