import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MachineDataListComponent } from './machine-data-list/machine-data-list.component';
import { MachineDataEditComponent } from './machine-data-edit/machine-data-edit.component';
import { MachineDataNewComponent } from './machine-data-new/machine-data-new.component';
import { MachineDataViewComponent } from './machine-data-view/machine-data-view.component';
import { MachineDataRoutingModule } from './machine-data.routing.module';
import { MachineDataService } from './shared/machine-data.service';
import { MachineDataGuard } from './shared/machine-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MachineDataListComponent,
    MachineDataNewComponent,
    MachineDataEditComponent,
    MachineDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MachineDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MachineDataService,
    MachineDataGuard
  ],
  entryComponents: [
    MachineDataNewComponent,
    MachineDataEditComponent,
    MachineDataViewComponent
  ]
})

export class MachineDataModule {
}
