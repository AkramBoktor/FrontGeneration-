import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BidPartsDataGuard } from './shared/bid-parts-data.guard';
import { BidPartsDataNewComponent } from './bid-parts-data-new/bid-parts-data-new.component';
import { BidPartsDataEditComponent } from './bid-parts-data-edit/bid-parts-data-edit.component';
import { BidPartsDataListComponent } from './bid-parts-data-list/bid-parts-data-list.component';
import { BidPartsDataViewComponent } from './bid-parts-data-view/bid-parts-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: BidPartsDataListComponent,
    canActivate: [BidPartsDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BidPartsDataNewComponent,
    canActivate: [BidPartsDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BidPartsDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BidPartsDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BidPartsDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BidPartsDataRoutingModule {
}
