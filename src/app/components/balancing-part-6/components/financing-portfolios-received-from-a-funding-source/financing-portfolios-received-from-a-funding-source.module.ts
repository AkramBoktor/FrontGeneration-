import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FinancingPortfoliosReceivedFromAFundingSourceListComponent } from './financing-portfolios-received-from-a-funding-source-list/financing-portfolios-received-from-a-funding-source-list.component';
import { FinancingPortfoliosReceivedFromAFundingSourceEditComponent } from './financing-portfolios-received-from-a-funding-source-edit/financing-portfolios-received-from-a-funding-source-edit.component';
import { FinancingPortfoliosReceivedFromAFundingSourceNewComponent } from './financing-portfolios-received-from-a-funding-source-new/financing-portfolios-received-from-a-funding-source-new.component';
import { FinancingPortfoliosReceivedFromAFundingSourceViewComponent } from './financing-portfolios-received-from-a-funding-source-view/financing-portfolios-received-from-a-funding-source-view.component';
import { FinancingPortfoliosReceivedFromAFundingSourceRoutingModule } from './financing-portfolios-received-from-a-funding-source.routing.module';
import { FinancingPortfoliosReceivedFromAFundingSourceService } from './shared/financing-portfolios-received-from-a-funding-source.service';
import { FinancingPortfoliosReceivedFromAFundingSourceGuard } from './shared/financing-portfolios-received-from-a-funding-source.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FinancingPortfoliosReceivedFromAFundingSourceListComponent,
    FinancingPortfoliosReceivedFromAFundingSourceNewComponent,
    FinancingPortfoliosReceivedFromAFundingSourceEditComponent,
    FinancingPortfoliosReceivedFromAFundingSourceViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FinancingPortfoliosReceivedFromAFundingSourceRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FinancingPortfoliosReceivedFromAFundingSourceService,
    FinancingPortfoliosReceivedFromAFundingSourceGuard
  ],
  entryComponents: [
    FinancingPortfoliosReceivedFromAFundingSourceNewComponent,
    FinancingPortfoliosReceivedFromAFundingSourceEditComponent,
    FinancingPortfoliosReceivedFromAFundingSourceViewComponent
  ]
})

export class FinancingPortfoliosReceivedFromAFundingSourceModule {
}
