import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AssayModelListComponent } from './assay-model-list/assay-model-list.component';
import { AssayModelEditComponent } from './assay-model-edit/assay-model-edit.component';
import { AssayModelNewComponent } from './assay-model-new/assay-model-new.component';
import { AssayModelViewComponent } from './assay-model-view/assay-model-view.component';
import { AssayModelRoutingModule } from './assay-model.routing.module';
import { AssayModelService } from './shared/assay-model.service';
import { AssayModelGuard } from './shared/assay-model.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AssayModelListComponent,
    AssayModelNewComponent,
    AssayModelEditComponent,
    AssayModelViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AssayModelRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AssayModelService,
    AssayModelGuard
  ],
  entryComponents: [
    AssayModelNewComponent,
    AssayModelEditComponent,
    AssayModelViewComponent
  ]
})

export class AssayModelModule {
}
