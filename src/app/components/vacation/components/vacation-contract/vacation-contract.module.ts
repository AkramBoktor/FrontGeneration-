import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { VacationContractListComponent } from './vacation-contract-list/vacation-contract-list.component';
import { VacationContractEditComponent } from './vacation-contract-edit/vacation-contract-edit.component';
import { VacationContractNewComponent } from './vacation-contract-new/vacation-contract-new.component';
import { VacationContractViewComponent } from './vacation-contract-view/vacation-contract-view.component';
import { VacationContractRoutingModule } from './vacation-contract.routing.module';
import { VacationContractService } from './shared/vacation-contract.service';
import { VacationContractGuard } from './shared/vacation-contract.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    VacationContractListComponent,
    VacationContractNewComponent,
    VacationContractEditComponent,
    VacationContractViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    VacationContractRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    VacationContractService,
    VacationContractGuard
  ],
  entryComponents: [
    VacationContractNewComponent,
    VacationContractEditComponent,
    VacationContractViewComponent
  ]
})

export class VacationContractModule {
}
