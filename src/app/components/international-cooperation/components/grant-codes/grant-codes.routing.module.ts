import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { GrantCodesGuard } from './shared/grant-codes.guard';
import { GrantCodesNewComponent } from './grant-codes-new/grant-codes-new.component';
import { GrantCodesEditComponent } from './grant-codes-edit/grant-codes-edit.component';
import { GrantCodesListComponent } from './grant-codes-list/grant-codes-list.component';
import { GrantCodesViewComponent } from './grant-codes-view/grant-codes-view.component';

const routes: Routes = [
  {
    path: '',
    component: GrantCodesListComponent,
    canActivate: [GrantCodesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: GrantCodesNewComponent,
    canActivate: [GrantCodesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: GrantCodesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: GrantCodesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: GrantCodesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class GrantCodesRoutingModule {
}
