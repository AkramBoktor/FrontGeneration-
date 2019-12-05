import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ContractorsClaimListComponent } from './contractors-claim-list/contractors-claim-list.component';
import { ContractorsClaimEditComponent } from './contractors-claim-edit/contractors-claim-edit.component';
import { ContractorsClaimNewComponent } from './contractors-claim-new/contractors-claim-new.component';
import { ContractorsClaimViewComponent } from './contractors-claim-view/contractors-claim-view.component';
import { ContractorsClaimRoutingModule } from './contractors-claim.routing.module';
import { ContractorsClaimService } from './shared/contractors-claim.service';
import { ContractorsClaimGuard } from './shared/contractors-claim.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ContractorsClaimListComponent,
    ContractorsClaimNewComponent,
    ContractorsClaimEditComponent,
    ContractorsClaimViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ContractorsClaimRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ContractorsClaimService,
    ContractorsClaimGuard
  ],
  entryComponents: [
    ContractorsClaimNewComponent,
    ContractorsClaimEditComponent,
    ContractorsClaimViewComponent
  ]
})

export class ContractorsClaimModule {
}
