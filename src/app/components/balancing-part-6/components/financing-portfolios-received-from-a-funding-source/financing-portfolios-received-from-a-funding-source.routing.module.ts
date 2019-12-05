import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FinancingPortfoliosReceivedFromAFundingSourceGuard } from './shared/financing-portfolios-received-from-a-funding-source.guard';
import { FinancingPortfoliosReceivedFromAFundingSourceNewComponent } from './financing-portfolios-received-from-a-funding-source-new/financing-portfolios-received-from-a-funding-source-new.component';
import { FinancingPortfoliosReceivedFromAFundingSourceEditComponent } from './financing-portfolios-received-from-a-funding-source-edit/financing-portfolios-received-from-a-funding-source-edit.component';
import { FinancingPortfoliosReceivedFromAFundingSourceListComponent } from './financing-portfolios-received-from-a-funding-source-list/financing-portfolios-received-from-a-funding-source-list.component';
import { FinancingPortfoliosReceivedFromAFundingSourceViewComponent } from './financing-portfolios-received-from-a-funding-source-view/financing-portfolios-received-from-a-funding-source-view.component';

const routes: Routes = [
  {
    path: '',
    component: FinancingPortfoliosReceivedFromAFundingSourceListComponent,
    canActivate: [FinancingPortfoliosReceivedFromAFundingSourceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FinancingPortfoliosReceivedFromAFundingSourceNewComponent,
    canActivate: [FinancingPortfoliosReceivedFromAFundingSourceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FinancingPortfoliosReceivedFromAFundingSourceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FinancingPortfoliosReceivedFromAFundingSourceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FinancingPortfoliosReceivedFromAFundingSourceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FinancingPortfoliosReceivedFromAFundingSourceRoutingModule {
}
