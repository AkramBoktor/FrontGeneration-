import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AddCashToAStoreGuard } from './shared/add-cash-to-a-store.guard';
import { AddCashToAStoreNewComponent } from './add-cash-to-a-store-new/add-cash-to-a-store-new.component';
import { AddCashToAStoreEditComponent } from './add-cash-to-a-store-edit/add-cash-to-a-store-edit.component';
import { AddCashToAStoreListComponent } from './add-cash-to-a-store-list/add-cash-to-a-store-list.component';
import { AddCashToAStoreViewComponent } from './add-cash-to-a-store-view/add-cash-to-a-store-view.component';

const routes: Routes = [
  {
    path: '',
    component: AddCashToAStoreListComponent,
    canActivate: [AddCashToAStoreGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AddCashToAStoreNewComponent,
    canActivate: [AddCashToAStoreGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AddCashToAStoreEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AddCashToAStoreListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AddCashToAStoreViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AddCashToAStoreRoutingModule {
}
