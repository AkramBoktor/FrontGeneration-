import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataForAnItemContainingOtherItemsListComponent } from './data-for-an-item-containing-other-items-list/data-for-an-item-containing-other-items-list.component';
import { DataForAnItemContainingOtherItemsEditComponent } from './data-for-an-item-containing-other-items-edit/data-for-an-item-containing-other-items-edit.component';
import { DataForAnItemContainingOtherItemsNewComponent } from './data-for-an-item-containing-other-items-new/data-for-an-item-containing-other-items-new.component';
import { DataForAnItemContainingOtherItemsViewComponent } from './data-for-an-item-containing-other-items-view/data-for-an-item-containing-other-items-view.component';
import { DataForAnItemContainingOtherItemsRoutingModule } from './data-for-an-item-containing-other-items.routing.module';
import { DataForAnItemContainingOtherItemsService } from './shared/data-for-an-item-containing-other-items.service';
import { DataForAnItemContainingOtherItemsGuard } from './shared/data-for-an-item-containing-other-items.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataForAnItemContainingOtherItemsListComponent,
    DataForAnItemContainingOtherItemsNewComponent,
    DataForAnItemContainingOtherItemsEditComponent,
    DataForAnItemContainingOtherItemsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataForAnItemContainingOtherItemsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataForAnItemContainingOtherItemsService,
    DataForAnItemContainingOtherItemsGuard
  ],
  entryComponents: [
    DataForAnItemContainingOtherItemsNewComponent,
    DataForAnItemContainingOtherItemsEditComponent,
    DataForAnItemContainingOtherItemsViewComponent
  ]
})

export class DataForAnItemContainingOtherItemsModule {
}
