import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialDisclosureStatementEditComponent } from './financial-disclosure-statement-edit/financial-disclosure-statement-edit.component';
import { FinancialDisclosureStatementListComponent } from './financial-disclosure-statement-list/financial-disclosure-statement-list.component';
import { FinancialDisclosureStatementNewComponent } from './financial-disclosure-statement-new/financial-disclosure-statement-new.component';
import { FinancialDisclosureStatementViewComponent } from './financial-disclosure-statement-view/financial-disclosure-statement-view.component';
import { FinancialDisclosureStatementGuard } from './shared/financial-disclosure-statement.guard';

const routes: Routes = [
  {
    path: '',
    component: FinancialDisclosureStatementListComponent,
    canActivate: [FinancialDisclosureStatementGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FinancialDisclosureStatementNewComponent,
    canActivate: [FinancialDisclosureStatementGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FinancialDisclosureStatementEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FinancialDisclosureStatementListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FinancialDisclosureStatementViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FinancialDisclosureStatementRoutingModule {
}
