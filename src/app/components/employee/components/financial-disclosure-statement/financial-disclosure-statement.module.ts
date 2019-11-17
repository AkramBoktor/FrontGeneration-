import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FinancialDisclosureStatementEditComponent } from './financial-disclosure-statement-edit/financial-disclosure-statement-edit.component';
import { FinancialDisclosureStatementListComponent } from './financial-disclosure-statement-list/financial-disclosure-statement-list.component';
import { FinancialDisclosureStatementNewComponent } from './financial-disclosure-statement-new/financial-disclosure-statement-new.component';
import { FinancialDisclosureStatementViewComponent } from './financial-disclosure-statement-view/financial-disclosure-statement-view.component';
import { FinancialDisclosureStatementRoutingModule } from './financial-disclosure-statement.routing.module';
import { FinancialDisclosureStatementGuard } from './shared/financial-disclosure-statement.guard';
import { FinancialDisclosureStatementService } from './shared/financial-disclosure-statement.service';

@NgModule({
  declarations: [
    FinancialDisclosureStatementListComponent,
    FinancialDisclosureStatementNewComponent,
    FinancialDisclosureStatementEditComponent,
    FinancialDisclosureStatementViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FinancialDisclosureStatementRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FinancialDisclosureStatementService,
    FinancialDisclosureStatementGuard
  ],
  entryComponents: [
    FinancialDisclosureStatementNewComponent,
    FinancialDisclosureStatementEditComponent,
    FinancialDisclosureStatementViewComponent
  ]
})

export class FinancialDisclosureStatementModule {
}
