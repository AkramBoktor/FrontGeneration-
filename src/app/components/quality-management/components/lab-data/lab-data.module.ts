import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LabDataListComponent } from './lab-data-list/lab-data-list.component';
import { LabDataEditComponent } from './lab-data-edit/lab-data-edit.component';
import { LabDataNewComponent } from './lab-data-new/lab-data-new.component';
import { LabDataViewComponent } from './lab-data-view/lab-data-view.component';
import { LabDataRoutingModule } from './lab-data.routing.module';
import { LabDataService } from './shared/lab-data.service';
import { LabDataGuard } from './shared/lab-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LabDataListComponent,
    LabDataNewComponent,
    LabDataEditComponent,
    LabDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LabDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LabDataService,
    LabDataGuard
  ],
  entryComponents: [
    LabDataNewComponent,
    LabDataEditComponent,
    LabDataViewComponent
  ]
})

export class LabDataModule {
}
