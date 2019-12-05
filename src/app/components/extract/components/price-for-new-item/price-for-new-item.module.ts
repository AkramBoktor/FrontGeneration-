import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PriceForNewItemListComponent } from './price-for-new-item-list/price-for-new-item-list.component';
import { PriceForNewItemEditComponent } from './price-for-new-item-edit/price-for-new-item-edit.component';
import { PriceForNewItemNewComponent } from './price-for-new-item-new/price-for-new-item-new.component';
import { PriceForNewItemViewComponent } from './price-for-new-item-view/price-for-new-item-view.component';
import { PriceForNewItemRoutingModule } from './price-for-new-item.routing.module';
import { PriceForNewItemService } from './shared/price-for-new-item.service';
import { PriceForNewItemGuard } from './shared/price-for-new-item.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PriceForNewItemListComponent,
    PriceForNewItemNewComponent,
    PriceForNewItemEditComponent,
    PriceForNewItemViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PriceForNewItemRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PriceForNewItemService,
    PriceForNewItemGuard
  ],
  entryComponents: [
    PriceForNewItemNewComponent,
    PriceForNewItemEditComponent,
    PriceForNewItemViewComponent
  ]
})

export class PriceForNewItemModule {
}
