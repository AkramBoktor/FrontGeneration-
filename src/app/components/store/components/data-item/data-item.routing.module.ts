import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataItemGuard } from './shared/data-item.guard';
import { DataItemNewComponent } from './data-item-new/data-item-new.component';
import { DataItemEditComponent } from './data-item-edit/data-item-edit.component';
import { DataItemListComponent } from './data-item-list/data-item-list.component';
import { DataItemViewComponent } from './data-item-view/data-item-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataItemListComponent,
    canActivate: [DataItemGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataItemNewComponent,
    canActivate: [DataItemGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataItemEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataItemListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataItemViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataItemRoutingModule {
}
