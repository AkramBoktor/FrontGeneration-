import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataItemListComponent } from './data-item-list/data-item-list.component';
import { DataItemEditComponent } from './data-item-edit/data-item-edit.component';
import { DataItemNewComponent } from './data-item-new/data-item-new.component';
import { DataItemViewComponent } from './data-item-view/data-item-view.component';
import { DataItemRoutingModule } from './data-item.routing.module';
import { DataItemService } from './shared/data-item.service';
import { DataItemGuard } from './shared/data-item.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataItemListComponent,
    DataItemNewComponent,
    DataItemEditComponent,
    DataItemViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataItemRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataItemService,
    DataItemGuard
  ],
  entryComponents: [
    DataItemNewComponent,
    DataItemEditComponent,
    DataItemViewComponent
  ]
})

export class DataItemModule {
}
