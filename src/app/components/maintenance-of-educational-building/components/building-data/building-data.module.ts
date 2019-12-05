import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BuildingDataListComponent } from './building-data-list/building-data-list.component';
import { BuildingDataEditComponent } from './building-data-edit/building-data-edit.component';
import { BuildingDataNewComponent } from './building-data-new/building-data-new.component';
import { BuildingDataViewComponent } from './building-data-view/building-data-view.component';
import { BuildingDataRoutingModule } from './building-data.routing.module';
import { BuildingDataService } from './shared/building-data.service';
import { BuildingDataGuard } from './shared/building-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BuildingDataListComponent,
    BuildingDataNewComponent,
    BuildingDataEditComponent,
    BuildingDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BuildingDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BuildingDataService,
    BuildingDataGuard
  ],
  entryComponents: [
    BuildingDataNewComponent,
    BuildingDataEditComponent,
    BuildingDataViewComponent
  ]
})

export class BuildingDataModule {
}
