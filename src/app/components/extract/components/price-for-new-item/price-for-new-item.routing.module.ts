import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PriceForNewItemGuard } from './shared/price-for-new-item.guard';
import { PriceForNewItemNewComponent } from './price-for-new-item-new/price-for-new-item-new.component';
import { PriceForNewItemEditComponent } from './price-for-new-item-edit/price-for-new-item-edit.component';
import { PriceForNewItemListComponent } from './price-for-new-item-list/price-for-new-item-list.component';
import { PriceForNewItemViewComponent } from './price-for-new-item-view/price-for-new-item-view.component';

const routes: Routes = [
  {
    path: '',
    component: PriceForNewItemListComponent,
    canActivate: [PriceForNewItemGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PriceForNewItemNewComponent,
    canActivate: [PriceForNewItemGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PriceForNewItemEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PriceForNewItemListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PriceForNewItemViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PriceForNewItemRoutingModule {
}
