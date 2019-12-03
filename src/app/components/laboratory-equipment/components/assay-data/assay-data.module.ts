import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AssayDataListComponent } from './assay-data-list/assay-data-list.component';
import { AssayDataEditComponent } from './assay-data-edit/assay-data-edit.component';
import { AssayDataNewComponent } from './assay-data-new/assay-data-new.component';
import { AssayDataViewComponent } from './assay-data-view/assay-data-view.component';
import { AssayDataRoutingModule } from './assay-data.routing.module';
import { AssayDataService } from './shared/assay-data.service';
import { AssayDataGuard } from './shared/assay-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AssayDataListComponent,
    AssayDataNewComponent,
    AssayDataEditComponent,
    AssayDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AssayDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AssayDataService,
    AssayDataGuard
  ],
  entryComponents: [
    AssayDataNewComponent,
    AssayDataEditComponent,
    AssayDataViewComponent
  ]
})

export class AssayDataModule {
}
