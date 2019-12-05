import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TypicalAssayDataListComponent } from './typical-assay-data-list/typical-assay-data-list.component';
import { TypicalAssayDataEditComponent } from './typical-assay-data-edit/typical-assay-data-edit.component';
import { TypicalAssayDataNewComponent } from './typical-assay-data-new/typical-assay-data-new.component';
import { TypicalAssayDataViewComponent } from './typical-assay-data-view/typical-assay-data-view.component';
import { TypicalAssayDataRoutingModule } from './typical-assay-data.routing.module';
import { TypicalAssayDataService } from './shared/typical-assay-data.service';
import { TypicalAssayDataGuard } from './shared/typical-assay-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TypicalAssayDataListComponent,
    TypicalAssayDataNewComponent,
    TypicalAssayDataEditComponent,
    TypicalAssayDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TypicalAssayDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TypicalAssayDataService,
    TypicalAssayDataGuard
  ],
  entryComponents: [
    TypicalAssayDataNewComponent,
    TypicalAssayDataEditComponent,
    TypicalAssayDataViewComponent
  ]
})

export class TypicalAssayDataModule {
}
