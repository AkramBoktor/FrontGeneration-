import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataElementOfBasicItemListComponent } from './data-element-of-basic-item-list/data-element-of-basic-item-list.component';
import { DataElementOfBasicItemEditComponent } from './data-element-of-basic-item-edit/data-element-of-basic-item-edit.component';
import { DataElementOfBasicItemNewComponent } from './data-element-of-basic-item-new/data-element-of-basic-item-new.component';
import { DataElementOfBasicItemViewComponent } from './data-element-of-basic-item-view/data-element-of-basic-item-view.component';
import { DataElementOfBasicItemRoutingModule } from './data-element-of-basic-item.routing.module';
import { DataElementOfBasicItemService } from './shared/data-element-of-basic-item.service';
import { DataElementOfBasicItemGuard } from './shared/data-element-of-basic-item.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataElementOfBasicItemListComponent,
    DataElementOfBasicItemNewComponent,
    DataElementOfBasicItemEditComponent,
    DataElementOfBasicItemViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataElementOfBasicItemRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataElementOfBasicItemService,
    DataElementOfBasicItemGuard
  ],
  entryComponents: [
    DataElementOfBasicItemNewComponent,
    DataElementOfBasicItemEditComponent,
    DataElementOfBasicItemViewComponent
  ]
})

export class DataElementOfBasicItemModule {
}
