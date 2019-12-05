import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TypicalIssuingASupplyOrderListComponent } from './typical-issuing-a-supply-order-list/typical-issuing-a-supply-order-list.component';
import { TypicalIssuingASupplyOrderEditComponent } from './typical-issuing-a-supply-order-edit/typical-issuing-a-supply-order-edit.component';
import { TypicalIssuingASupplyOrderNewComponent } from './typical-issuing-a-supply-order-new/typical-issuing-a-supply-order-new.component';
import { TypicalIssuingASupplyOrderViewComponent } from './typical-issuing-a-supply-order-view/typical-issuing-a-supply-order-view.component';
import { TypicalIssuingASupplyOrderRoutingModule } from './typical-issuing-a-supply-order.routing.module';
import { TypicalIssuingASupplyOrderService } from './shared/typical-issuing-a-supply-order.service';
import { TypicalIssuingASupplyOrderGuard } from './shared/typical-issuing-a-supply-order.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TypicalIssuingASupplyOrderListComponent,
    TypicalIssuingASupplyOrderNewComponent,
    TypicalIssuingASupplyOrderEditComponent,
    TypicalIssuingASupplyOrderViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TypicalIssuingASupplyOrderRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TypicalIssuingASupplyOrderService,
    TypicalIssuingASupplyOrderGuard
  ],
  entryComponents: [
    TypicalIssuingASupplyOrderNewComponent,
    TypicalIssuingASupplyOrderEditComponent,
    TypicalIssuingASupplyOrderViewComponent
  ]
})

export class TypicalIssuingASupplyOrderModule {
}
