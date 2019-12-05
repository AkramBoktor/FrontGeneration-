import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { InsertNewExpensesForRegionalFinancialPortfoliosGuard } from './shared/insert-new-expenses-for-regional-financial-portfolios.guard';
import { InsertNewExpensesForRegionalFinancialPortfoliosNewComponent } from './insert-new-expenses-for-regional-financial-portfolios-new/insert-new-expenses-for-regional-financial-portfolios-new.component';
import { InsertNewExpensesForRegionalFinancialPortfoliosEditComponent } from './insert-new-expenses-for-regional-financial-portfolios-edit/insert-new-expenses-for-regional-financial-portfolios-edit.component';
import { InsertNewExpensesForRegionalFinancialPortfoliosListComponent } from './insert-new-expenses-for-regional-financial-portfolios-list/insert-new-expenses-for-regional-financial-portfolios-list.component';
import { InsertNewExpensesForRegionalFinancialPortfoliosViewComponent } from './insert-new-expenses-for-regional-financial-portfolios-view/insert-new-expenses-for-regional-financial-portfolios-view.component';

const routes: Routes = [
  {
    path: '',
    component: InsertNewExpensesForRegionalFinancialPortfoliosListComponent,
    canActivate: [InsertNewExpensesForRegionalFinancialPortfoliosGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: InsertNewExpensesForRegionalFinancialPortfoliosNewComponent,
    canActivate: [InsertNewExpensesForRegionalFinancialPortfoliosGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: InsertNewExpensesForRegionalFinancialPortfoliosEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: InsertNewExpensesForRegionalFinancialPortfoliosListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: InsertNewExpensesForRegionalFinancialPortfoliosViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class InsertNewExpensesForRegionalFinancialPortfoliosRoutingModule {
}
