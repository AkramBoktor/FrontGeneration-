import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TypicalDeliveryDateForASupplyOrderListComponent } from './typical-delivery-date-for-a-supply-order-list/typical-delivery-date-for-a-supply-order-list.component';
import { TypicalDeliveryDateForASupplyOrderEditComponent } from './typical-delivery-date-for-a-supply-order-edit/typical-delivery-date-for-a-supply-order-edit.component';
import { TypicalDeliveryDateForASupplyOrderNewComponent } from './typical-delivery-date-for-a-supply-order-new/typical-delivery-date-for-a-supply-order-new.component';
import { TypicalDeliveryDateForASupplyOrderViewComponent } from './typical-delivery-date-for-a-supply-order-view/typical-delivery-date-for-a-supply-order-view.component';
import { TypicalDeliveryDateForASupplyOrderRoutingModule } from './typical-delivery-date-for-a-supply-order.routing.module';
import { TypicalDeliveryDateForASupplyOrderService } from './shared/typical-delivery-date-for-a-supply-order.service';
import { TypicalDeliveryDateForASupplyOrderGuard } from './shared/typical-delivery-date-for-a-supply-order.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TypicalDeliveryDateForASupplyOrderListComponent,
    TypicalDeliveryDateForASupplyOrderNewComponent,
    TypicalDeliveryDateForASupplyOrderEditComponent,
    TypicalDeliveryDateForASupplyOrderViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TypicalDeliveryDateForASupplyOrderRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TypicalDeliveryDateForASupplyOrderService,
    TypicalDeliveryDateForASupplyOrderGuard
  ],
  entryComponents: [
    TypicalDeliveryDateForASupplyOrderNewComponent,
    TypicalDeliveryDateForASupplyOrderEditComponent,
    TypicalDeliveryDateForASupplyOrderViewComponent
  ]
})

export class TypicalDeliveryDateForASupplyOrderModule {
}
