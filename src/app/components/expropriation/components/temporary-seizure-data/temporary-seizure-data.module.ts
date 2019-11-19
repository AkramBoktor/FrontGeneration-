import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TemporarySeizureDataListComponent } from './temporary-seizure-data-list/temporary-seizure-data-list.component';
import { TemporarySeizureDataEditComponent } from './temporary-seizure-data-edit/temporary-seizure-data-edit.component';
import { TemporarySeizureDataNewComponent } from './temporary-seizure-data-new/temporary-seizure-data-new.component';
import { TemporarySeizureDataViewComponent } from './temporary-seizure-data-view/temporary-seizure-data-view.component';
import { TemporarySeizureDataRoutingModule } from './temporary-seizure-data.routing.module';
import { TemporarySeizureDataService } from './shared/temporary-seizure-data.service';
import { TemporarySeizureDataGuard } from './shared/temporary-seizure-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TemporarySeizureDataListComponent,
    TemporarySeizureDataNewComponent,
    TemporarySeizureDataEditComponent,
    TemporarySeizureDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TemporarySeizureDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TemporarySeizureDataService,
    TemporarySeizureDataGuard
  ],
  entryComponents: [
    TemporarySeizureDataNewComponent,
    TemporarySeizureDataEditComponent,
    TemporarySeizureDataViewComponent
  ]
})

export class TemporarySeizureDataModule {
}
