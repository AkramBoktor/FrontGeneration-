import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DeliveryWarehousesToKeepersListComponent } from './delivery-warehouses-to-keepers-list/delivery-warehouses-to-keepers-list.component';
import { DeliveryWarehousesToKeepersEditComponent } from './delivery-warehouses-to-keepers-edit/delivery-warehouses-to-keepers-edit.component';
import { DeliveryWarehousesToKeepersNewComponent } from './delivery-warehouses-to-keepers-new/delivery-warehouses-to-keepers-new.component';
import { DeliveryWarehousesToKeepersViewComponent } from './delivery-warehouses-to-keepers-view/delivery-warehouses-to-keepers-view.component';
import { DeliveryWarehousesToKeepersRoutingModule } from './delivery-warehouses-to-keepers.routing.module';
import { DeliveryWarehousesToKeepersService } from './shared/delivery-warehouses-to-keepers.service';
import { DeliveryWarehousesToKeepersGuard } from './shared/delivery-warehouses-to-keepers.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DeliveryWarehousesToKeepersListComponent,
    DeliveryWarehousesToKeepersNewComponent,
    DeliveryWarehousesToKeepersEditComponent,
    DeliveryWarehousesToKeepersViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DeliveryWarehousesToKeepersRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DeliveryWarehousesToKeepersService,
    DeliveryWarehousesToKeepersGuard
  ],
  entryComponents: [
    DeliveryWarehousesToKeepersNewComponent,
    DeliveryWarehousesToKeepersEditComponent,
    DeliveryWarehousesToKeepersViewComponent
  ]
})

export class DeliveryWarehousesToKeepersModule {
}
