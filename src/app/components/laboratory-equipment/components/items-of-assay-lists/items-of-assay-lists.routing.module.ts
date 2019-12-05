import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ItemsOfAssayListsGuard } from './shared/items-of-assay-lists.guard';
import { ItemsOfAssayListsNewComponent } from './items-of-assay-lists-new/items-of-assay-lists-new.component';
import { ItemsOfAssayListsEditComponent } from './items-of-assay-lists-edit/items-of-assay-lists-edit.component';
import { ItemsOfAssayListsListComponent } from './items-of-assay-lists-list/items-of-assay-lists-list.component';
import { ItemsOfAssayListsViewComponent } from './items-of-assay-lists-view/items-of-assay-lists-view.component';

const routes: Routes = [
  {
    path: '',
    component: ItemsOfAssayListsListComponent,
    canActivate: [ItemsOfAssayListsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ItemsOfAssayListsNewComponent,
    canActivate: [ItemsOfAssayListsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ItemsOfAssayListsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ItemsOfAssayListsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ItemsOfAssayListsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ItemsOfAssayListsRoutingModule {
}
