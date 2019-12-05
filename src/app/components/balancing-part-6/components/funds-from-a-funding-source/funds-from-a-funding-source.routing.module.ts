import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FundsFromAFundingSourceGuard } from './shared/funds-from-a-funding-source.guard';
import { FundsFromAFundingSourceNewComponent } from './funds-from-a-funding-source-new/funds-from-a-funding-source-new.component';
import { FundsFromAFundingSourceEditComponent } from './funds-from-a-funding-source-edit/funds-from-a-funding-source-edit.component';
import { FundsFromAFundingSourceListComponent } from './funds-from-a-funding-source-list/funds-from-a-funding-source-list.component';
import { FundsFromAFundingSourceViewComponent } from './funds-from-a-funding-source-view/funds-from-a-funding-source-view.component';

const routes: Routes = [
  {
    path: '',
    component: FundsFromAFundingSourceListComponent,
    canActivate: [FundsFromAFundingSourceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FundsFromAFundingSourceNewComponent,
    canActivate: [FundsFromAFundingSourceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FundsFromAFundingSourceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FundsFromAFundingSourceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FundsFromAFundingSourceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FundsFromAFundingSourceRoutingModule {
}
