import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LinkItemsToObjectCodesGuard } from './shared/link-items-to-object-codes.guard';
import { LinkItemsToObjectCodesNewComponent } from './link-items-to-object-codes-new/link-items-to-object-codes-new.component';
import { LinkItemsToObjectCodesEditComponent } from './link-items-to-object-codes-edit/link-items-to-object-codes-edit.component';
import { LinkItemsToObjectCodesListComponent } from './link-items-to-object-codes-list/link-items-to-object-codes-list.component';
import { LinkItemsToObjectCodesViewComponent } from './link-items-to-object-codes-view/link-items-to-object-codes-view.component';

const routes: Routes = [
  {
    path: '',
    component: LinkItemsToObjectCodesListComponent,
    canActivate: [LinkItemsToObjectCodesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LinkItemsToObjectCodesNewComponent,
    canActivate: [LinkItemsToObjectCodesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LinkItemsToObjectCodesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LinkItemsToObjectCodesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LinkItemsToObjectCodesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LinkItemsToObjectCodesRoutingModule {
}
