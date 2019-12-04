import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LinkItemToTimeTableGuard } from './shared/link-item-to-time-table.guard';
import { LinkItemToTimeTableNewComponent } from './link-item-to-time-table-new/link-item-to-time-table-new.component';
import { LinkItemToTimeTableEditComponent } from './link-item-to-time-table-edit/link-item-to-time-table-edit.component';
import { LinkItemToTimeTableListComponent } from './link-item-to-time-table-list/link-item-to-time-table-list.component';
import { LinkItemToTimeTableViewComponent } from './link-item-to-time-table-view/link-item-to-time-table-view.component';

const routes: Routes = [
  {
    path: '',
    component: LinkItemToTimeTableListComponent,
    canActivate: [LinkItemToTimeTableGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LinkItemToTimeTableNewComponent,
    canActivate: [LinkItemToTimeTableGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LinkItemToTimeTableEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LinkItemToTimeTableListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LinkItemToTimeTableViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LinkItemToTimeTableRoutingModule {
}
