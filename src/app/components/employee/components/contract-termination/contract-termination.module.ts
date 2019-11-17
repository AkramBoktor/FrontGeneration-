import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ContractTerminationEditComponent } from './contract-termination-edit/contract-termination-edit.component';
import { ContractTerminationListComponent } from './contract-termination-list/contract-termination-list.component';
import { ContractTerminationNewComponent } from './contract-termination-new/contract-termination-new.component';
import { ContractTerminationViewComponent } from './contract-termination-view/contract-termination-view.component';
import { ContractTerminationRoutingModule } from './contract-termination.routing.module';
import { ContractTerminationGuard } from './shared/contract-termination.guard';
import { ContractTerminationService } from './shared/contract-termination.service';

@NgModule({
  declarations: [
    ContractTerminationListComponent,
    ContractTerminationNewComponent,
    ContractTerminationEditComponent,
    ContractTerminationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ContractTerminationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ContractTerminationService,
    ContractTerminationGuard
  ],
  entryComponents: [
    ContractTerminationNewComponent,
    ContractTerminationEditComponent,
    ContractTerminationViewComponent
  ]
})

export class ContractTerminationModule {
}
