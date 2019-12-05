import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { HealthUnitDataListComponent } from './health-unit-data-list/health-unit-data-list.component';
import { HealthUnitDataEditComponent } from './health-unit-data-edit/health-unit-data-edit.component';
import { HealthUnitDataNewComponent } from './health-unit-data-new/health-unit-data-new.component';
import { HealthUnitDataViewComponent } from './health-unit-data-view/health-unit-data-view.component';
import { HealthUnitDataRoutingModule } from './health-unit-data.routing.module';
import { HealthUnitDataService } from './shared/health-unit-data.service';
import { HealthUnitDataGuard } from './shared/health-unit-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    HealthUnitDataListComponent,
    HealthUnitDataNewComponent,
    HealthUnitDataEditComponent,
    HealthUnitDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    HealthUnitDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    HealthUnitDataService,
    HealthUnitDataGuard
  ],
  entryComponents: [
    HealthUnitDataNewComponent,
    HealthUnitDataEditComponent,
    HealthUnitDataViewComponent
  ]
})

export class HealthUnitDataModule {
}
