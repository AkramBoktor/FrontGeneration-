import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LinkSubitemsToTheMainItemsGuard } from './shared/link-subitems-to-the-main-items.guard';
import { LinkSubitemsToTheMainItemsNewComponent } from './link-subitems-to-the-main-items-new/link-subitems-to-the-main-items-new.component';
import { LinkSubitemsToTheMainItemsEditComponent } from './link-subitems-to-the-main-items-edit/link-subitems-to-the-main-items-edit.component';
import { LinkSubitemsToTheMainItemsListComponent } from './link-subitems-to-the-main-items-list/link-subitems-to-the-main-items-list.component';
import { LinkSubitemsToTheMainItemsViewComponent } from './link-subitems-to-the-main-items-view/link-subitems-to-the-main-items-view.component';

const routes: Routes = [
  {
    path: '',
    component: LinkSubitemsToTheMainItemsListComponent,
    canActivate: [LinkSubitemsToTheMainItemsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LinkSubitemsToTheMainItemsNewComponent,
    canActivate: [LinkSubitemsToTheMainItemsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LinkSubitemsToTheMainItemsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LinkSubitemsToTheMainItemsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LinkSubitemsToTheMainItemsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LinkSubitemsToTheMainItemsRoutingModule {
}
