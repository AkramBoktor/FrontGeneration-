import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataStoreGuard } from './shared/data-store.guard';
import { DataStoreNewComponent } from './data-store-new/data-store-new.component';
import { DataStoreEditComponent } from './data-store-edit/data-store-edit.component';
import { DataStoreListComponent } from './data-store-list/data-store-list.component';
import { DataStoreViewComponent } from './data-store-view/data-store-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataStoreListComponent,
    canActivate: [DataStoreGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataStoreNewComponent,
    canActivate: [DataStoreGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataStoreEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataStoreListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataStoreViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataStoreRoutingModule {
}
