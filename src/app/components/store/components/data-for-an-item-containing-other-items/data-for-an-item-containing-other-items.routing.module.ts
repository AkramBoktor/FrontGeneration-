import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataForAnItemContainingOtherItemsGuard } from './shared/data-for-an-item-containing-other-items.guard';
import { DataForAnItemContainingOtherItemsNewComponent } from './data-for-an-item-containing-other-items-new/data-for-an-item-containing-other-items-new.component';
import { DataForAnItemContainingOtherItemsEditComponent } from './data-for-an-item-containing-other-items-edit/data-for-an-item-containing-other-items-edit.component';
import { DataForAnItemContainingOtherItemsListComponent } from './data-for-an-item-containing-other-items-list/data-for-an-item-containing-other-items-list.component';
import { DataForAnItemContainingOtherItemsViewComponent } from './data-for-an-item-containing-other-items-view/data-for-an-item-containing-other-items-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataForAnItemContainingOtherItemsListComponent,
    canActivate: [DataForAnItemContainingOtherItemsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataForAnItemContainingOtherItemsNewComponent,
    canActivate: [DataForAnItemContainingOtherItemsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataForAnItemContainingOtherItemsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataForAnItemContainingOtherItemsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataForAnItemContainingOtherItemsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataForAnItemContainingOtherItemsRoutingModule {
}
