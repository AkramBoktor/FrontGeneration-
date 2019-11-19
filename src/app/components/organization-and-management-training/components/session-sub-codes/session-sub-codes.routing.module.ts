import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SessionSubCodesGuard } from './shared/session-sub-codes.guard';
import { SessionSubCodesNewComponent } from './session-sub-codes-new/session-sub-codes-new.component';
import { SessionSubCodesEditComponent } from './session-sub-codes-edit/session-sub-codes-edit.component';
import { SessionSubCodesListComponent } from './session-sub-codes-list/session-sub-codes-list.component';
import { SessionSubCodesViewComponent } from './session-sub-codes-view/session-sub-codes-view.component';

const routes: Routes = [
  {
    path: '',
    component: SessionSubCodesListComponent,
    canActivate: [SessionSubCodesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SessionSubCodesNewComponent,
    canActivate: [SessionSubCodesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SessionSubCodesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SessionSubCodesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SessionSubCodesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SessionSubCodesRoutingModule {
}
