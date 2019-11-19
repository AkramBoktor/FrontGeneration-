import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DataStoreListComponent } from './data-store-list/data-store-list.component';
import { DataStoreEditComponent } from './data-store-edit/data-store-edit.component';
import { DataStoreNewComponent } from './data-store-new/data-store-new.component';
import { DataStoreViewComponent } from './data-store-view/data-store-view.component';
import { DataStoreRoutingModule } from './data-store.routing.module';
import { DataStoreService } from './shared/data-store.service';
import { DataStoreGuard } from './shared/data-store.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DataStoreListComponent,
    DataStoreNewComponent,
    DataStoreEditComponent,
    DataStoreViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DataStoreRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DataStoreService,
    DataStoreGuard
  ],
  entryComponents: [
    DataStoreNewComponent,
    DataStoreEditComponent,
    DataStoreViewComponent
  ]
})

export class DataStoreModule {
}
