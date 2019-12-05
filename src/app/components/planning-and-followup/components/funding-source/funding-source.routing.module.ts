import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FundingSourceGuard } from './shared/funding-source.guard';
import { FundingSourceNewComponent } from './funding-source-new/funding-source-new.component';
import { FundingSourceEditComponent } from './funding-source-edit/funding-source-edit.component';
import { FundingSourceListComponent } from './funding-source-list/funding-source-list.component';
import { FundingSourceViewComponent } from './funding-source-view/funding-source-view.component';

const routes: Routes = [
  {
    path: '',
    component: FundingSourceListComponent,
    canActivate: [FundingSourceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: FundingSourceNewComponent,
    canActivate: [FundingSourceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: FundingSourceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: FundingSourceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: FundingSourceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class FundingSourceRoutingModule {
}
