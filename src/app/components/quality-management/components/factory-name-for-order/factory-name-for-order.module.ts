import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FactoryNameForOrderListComponent } from './factory-name-for-order-list/factory-name-for-order-list.component';
import { FactoryNameForOrderEditComponent } from './factory-name-for-order-edit/factory-name-for-order-edit.component';
import { FactoryNameForOrderNewComponent } from './factory-name-for-order-new/factory-name-for-order-new.component';
import { FactoryNameForOrderViewComponent } from './factory-name-for-order-view/factory-name-for-order-view.component';
import { FactoryNameForOrderRoutingModule } from './factory-name-for-order.routing.module';
import { FactoryNameForOrderService } from './shared/factory-name-for-order.service';
import { FactoryNameForOrderGuard } from './shared/factory-name-for-order.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FactoryNameForOrderListComponent,
    FactoryNameForOrderNewComponent,
    FactoryNameForOrderEditComponent,
    FactoryNameForOrderViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FactoryNameForOrderRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FactoryNameForOrderService,
    FactoryNameForOrderGuard
  ],
  entryComponents: [
    FactoryNameForOrderNewComponent,
    FactoryNameForOrderEditComponent,
    FactoryNameForOrderViewComponent
  ]
})

export class FactoryNameForOrderModule {
}
