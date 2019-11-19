import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ContractorDurationsListComponent } from './contractor-durations-list/contractor-durations-list.component';
import { ContractorDurationsEditComponent } from './contractor-durations-edit/contractor-durations-edit.component';
import { ContractorDurationsNewComponent } from './contractor-durations-new/contractor-durations-new.component';
import { ContractorDurationsViewComponent } from './contractor-durations-view/contractor-durations-view.component';
import { ContractorDurationsRoutingModule } from './contractor-durations.routing.module';
import { ContractorDurationsService } from './shared/contractor-durations.service';
import { ContractorDurationsGuard } from './shared/contractor-durations.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ContractorDurationsListComponent,
    ContractorDurationsNewComponent,
    ContractorDurationsEditComponent,
    ContractorDurationsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ContractorDurationsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ContractorDurationsService,
    ContractorDurationsGuard
  ],
  entryComponents: [
    ContractorDurationsNewComponent,
    ContractorDurationsEditComponent,
    ContractorDurationsViewComponent
  ]
})

export class ContractorDurationsModule {
}
