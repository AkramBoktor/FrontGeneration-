import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RecordTheClaimFormWithTheExchangeItemGuard } from './shared/record-the-claim-form-with-the-exchange-item.guard';
import { RecordTheClaimFormWithTheExchangeItemNewComponent } from './record-the-claim-form-with-the-exchange-item-new/record-the-claim-form-with-the-exchange-item-new.component';
import { RecordTheClaimFormWithTheExchangeItemEditComponent } from './record-the-claim-form-with-the-exchange-item-edit/record-the-claim-form-with-the-exchange-item-edit.component';
import { RecordTheClaimFormWithTheExchangeItemListComponent } from './record-the-claim-form-with-the-exchange-item-list/record-the-claim-form-with-the-exchange-item-list.component';
import { RecordTheClaimFormWithTheExchangeItemViewComponent } from './record-the-claim-form-with-the-exchange-item-view/record-the-claim-form-with-the-exchange-item-view.component';

const routes: Routes = [
  {
    path: '',
    component: RecordTheClaimFormWithTheExchangeItemListComponent,
    canActivate: [RecordTheClaimFormWithTheExchangeItemGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RecordTheClaimFormWithTheExchangeItemNewComponent,
    canActivate: [RecordTheClaimFormWithTheExchangeItemGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RecordTheClaimFormWithTheExchangeItemEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RecordTheClaimFormWithTheExchangeItemListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RecordTheClaimFormWithTheExchangeItemViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RecordTheClaimFormWithTheExchangeItemRoutingModule {
}
