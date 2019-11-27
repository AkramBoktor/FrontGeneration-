import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EnteringResortDataListComponent } from './entering-resort-data-list/entering-resort-data-list.component';
import { EnteringResortDataEditComponent } from './entering-resort-data-edit/entering-resort-data-edit.component';
import { EnteringResortDataNewComponent } from './entering-resort-data-new/entering-resort-data-new.component';
import { EnteringResortDataViewComponent } from './entering-resort-data-view/entering-resort-data-view.component';
import { EnteringResortDataRoutingModule } from './entering-resort-data.routing.module';
import { EnteringResortDataService } from './shared/entering-resort-data.service';
import { EnteringResortDataGuard } from './shared/entering-resort-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EnteringResortDataListComponent,
    EnteringResortDataNewComponent,
    EnteringResortDataEditComponent,
    EnteringResortDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EnteringResortDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EnteringResortDataService,
    EnteringResortDataGuard
  ],
  entryComponents: [
    EnteringResortDataNewComponent,
    EnteringResortDataEditComponent,
    EnteringResortDataViewComponent
  ]
})

export class EnteringResortDataModule {
}
