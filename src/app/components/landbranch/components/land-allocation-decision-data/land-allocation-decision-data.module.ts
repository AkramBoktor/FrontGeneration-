import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LandAllocationDecisionDataListComponent } from './land-allocation-decision-data-list/land-allocation-decision-data-list.component';
import { LandAllocationDecisionDataEditComponent } from './land-allocation-decision-data-edit/land-allocation-decision-data-edit.component';
import { LandAllocationDecisionDataNewComponent } from './land-allocation-decision-data-new/land-allocation-decision-data-new.component';
import { LandAllocationDecisionDataViewComponent } from './land-allocation-decision-data-view/land-allocation-decision-data-view.component';
import { LandAllocationDecisionDataRoutingModule } from './land-allocation-decision-data.routing.module';
import { LandAllocationDecisionDataService } from './shared/land-allocation-decision-data.service';
import { LandAllocationDecisionDataGuard } from './shared/land-allocation-decision-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LandAllocationDecisionDataListComponent,
    LandAllocationDecisionDataNewComponent,
    LandAllocationDecisionDataEditComponent,
    LandAllocationDecisionDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LandAllocationDecisionDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LandAllocationDecisionDataService,
    LandAllocationDecisionDataGuard
  ],
  entryComponents: [
    LandAllocationDecisionDataNewComponent,
    LandAllocationDecisionDataEditComponent,
    LandAllocationDecisionDataViewComponent
  ]
})

export class LandAllocationDecisionDataModule {
}
