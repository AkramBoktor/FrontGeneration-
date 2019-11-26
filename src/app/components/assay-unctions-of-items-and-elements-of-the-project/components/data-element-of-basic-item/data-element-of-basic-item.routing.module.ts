import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataElementOfBasicItemGuard } from './shared/data-element-of-basic-item.guard';
import { DataElementOfBasicItemNewComponent } from './data-element-of-basic-item-new/data-element-of-basic-item-new.component';
import { DataElementOfBasicItemEditComponent } from './data-element-of-basic-item-edit/data-element-of-basic-item-edit.component';
import { DataElementOfBasicItemListComponent } from './data-element-of-basic-item-list/data-element-of-basic-item-list.component';
import { DataElementOfBasicItemViewComponent } from './data-element-of-basic-item-view/data-element-of-basic-item-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataElementOfBasicItemListComponent,
    canActivate: [DataElementOfBasicItemGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataElementOfBasicItemNewComponent,
    canActivate: [DataElementOfBasicItemGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataElementOfBasicItemEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataElementOfBasicItemListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataElementOfBasicItemViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataElementOfBasicItemRoutingModule {
}
