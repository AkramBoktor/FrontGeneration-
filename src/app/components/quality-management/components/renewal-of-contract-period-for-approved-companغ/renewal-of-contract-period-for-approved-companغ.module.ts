import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RenewalOfContractPeriodForApprovedCompanغListComponent } from './renewal-of-contract-period-for-approved-companغ-list/renewal-of-contract-period-for-approved-companغ-list.component';
import { RenewalOfContractPeriodForApprovedCompanغEditComponent } from './renewal-of-contract-period-for-approved-companغ-edit/renewal-of-contract-period-for-approved-companغ-edit.component';
import { RenewalOfContractPeriodForApprovedCompanغNewComponent } from './renewal-of-contract-period-for-approved-companغ-new/renewal-of-contract-period-for-approved-companغ-new.component';
import { RenewalOfContractPeriodForApprovedCompanغViewComponent } from './renewal-of-contract-period-for-approved-companغ-view/renewal-of-contract-period-for-approved-companغ-view.component';
import { RenewalOfContractPeriodForApprovedCompanغRoutingModule } from './renewal-of-contract-period-for-approved-companغ.routing.module';
import { RenewalOfContractPeriodForApprovedCompanغService } from './shared/renewal-of-contract-period-for-approved-companغ.service';
import { RenewalOfContractPeriodForApprovedCompanغGuard } from './shared/renewal-of-contract-period-for-approved-companغ.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RenewalOfContractPeriodForApprovedCompanغListComponent,
    RenewalOfContractPeriodForApprovedCompanغNewComponent,
    RenewalOfContractPeriodForApprovedCompanغEditComponent,
    RenewalOfContractPeriodForApprovedCompanغViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RenewalOfContractPeriodForApprovedCompanغRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RenewalOfContractPeriodForApprovedCompanغService,
    RenewalOfContractPeriodForApprovedCompanغGuard
  ],
  entryComponents: [
    RenewalOfContractPeriodForApprovedCompanغNewComponent,
    RenewalOfContractPeriodForApprovedCompanغEditComponent,
    RenewalOfContractPeriodForApprovedCompanغViewComponent
  ]
})

export class RenewalOfContractPeriodForApprovedCompanغModule {
}
