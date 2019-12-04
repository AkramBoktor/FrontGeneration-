import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AssayItemListComponent } from './assay-item-list/assay-item-list.component';
import { AssayItemEditComponent } from './assay-item-edit/assay-item-edit.component';
import { AssayItemNewComponent } from './assay-item-new/assay-item-new.component';
import { AssayItemViewComponent } from './assay-item-view/assay-item-view.component';
import { AssayItemRoutingModule } from './assay-item.routing.module';
import { AssayItemService } from './shared/assay-item.service';
import { AssayItemGuard } from './shared/assay-item.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AssayItemListComponent,
    AssayItemNewComponent,
    AssayItemEditComponent,
    AssayItemViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AssayItemRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AssayItemService,
    AssayItemGuard
  ],
  entryComponents: [
    AssayItemNewComponent,
    AssayItemEditComponent,
    AssayItemViewComponent
  ]
})

export class AssayItemModule {
}
