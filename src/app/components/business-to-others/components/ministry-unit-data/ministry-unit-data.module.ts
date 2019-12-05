import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MinistryUnitDataListComponent } from './ministry-unit-data-list/ministry-unit-data-list.component';
import { MinistryUnitDataEditComponent } from './ministry-unit-data-edit/ministry-unit-data-edit.component';
import { MinistryUnitDataNewComponent } from './ministry-unit-data-new/ministry-unit-data-new.component';
import { MinistryUnitDataViewComponent } from './ministry-unit-data-view/ministry-unit-data-view.component';
import { MinistryUnitDataRoutingModule } from './ministry-unit-data.routing.module';
import { MinistryUnitDataService } from './shared/ministry-unit-data.service';
import { MinistryUnitDataGuard } from './shared/ministry-unit-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MinistryUnitDataListComponent,
    MinistryUnitDataNewComponent,
    MinistryUnitDataEditComponent,
    MinistryUnitDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MinistryUnitDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MinistryUnitDataService,
    MinistryUnitDataGuard
  ],
  entryComponents: [
    MinistryUnitDataNewComponent,
    MinistryUnitDataEditComponent,
    MinistryUnitDataViewComponent
  ]
})

export class MinistryUnitDataModule {
}
