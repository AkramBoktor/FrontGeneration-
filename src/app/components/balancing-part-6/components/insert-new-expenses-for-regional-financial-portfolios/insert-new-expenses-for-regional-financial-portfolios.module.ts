import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { InsertNewExpensesForRegionalFinancialPortfoliosListComponent } from './insert-new-expenses-for-regional-financial-portfolios-list/insert-new-expenses-for-regional-financial-portfolios-list.component';
import { InsertNewExpensesForRegionalFinancialPortfoliosEditComponent } from './insert-new-expenses-for-regional-financial-portfolios-edit/insert-new-expenses-for-regional-financial-portfolios-edit.component';
import { InsertNewExpensesForRegionalFinancialPortfoliosNewComponent } from './insert-new-expenses-for-regional-financial-portfolios-new/insert-new-expenses-for-regional-financial-portfolios-new.component';
import { InsertNewExpensesForRegionalFinancialPortfoliosViewComponent } from './insert-new-expenses-for-regional-financial-portfolios-view/insert-new-expenses-for-regional-financial-portfolios-view.component';
import { InsertNewExpensesForRegionalFinancialPortfoliosRoutingModule } from './insert-new-expenses-for-regional-financial-portfolios.routing.module';
import { InsertNewExpensesForRegionalFinancialPortfoliosService } from './shared/insert-new-expenses-for-regional-financial-portfolios.service';
import { InsertNewExpensesForRegionalFinancialPortfoliosGuard } from './shared/insert-new-expenses-for-regional-financial-portfolios.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    InsertNewExpensesForRegionalFinancialPortfoliosListComponent,
    InsertNewExpensesForRegionalFinancialPortfoliosNewComponent,
    InsertNewExpensesForRegionalFinancialPortfoliosEditComponent,
    InsertNewExpensesForRegionalFinancialPortfoliosViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    InsertNewExpensesForRegionalFinancialPortfoliosRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    InsertNewExpensesForRegionalFinancialPortfoliosService,
    InsertNewExpensesForRegionalFinancialPortfoliosGuard
  ],
  entryComponents: [
    InsertNewExpensesForRegionalFinancialPortfoliosNewComponent,
    InsertNewExpensesForRegionalFinancialPortfoliosEditComponent,
    InsertNewExpensesForRegionalFinancialPortfoliosViewComponent
  ]
})

export class InsertNewExpensesForRegionalFinancialPortfoliosModule {
}
