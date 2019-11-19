import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AuthorizationExchangeGuard } from './shared/authorization-exchange.guard';
import { AuthorizationExchangeNewComponent } from './authorization-exchange-new/authorization-exchange-new.component';
import { AuthorizationExchangeEditComponent } from './authorization-exchange-edit/authorization-exchange-edit.component';
import { AuthorizationExchangeListComponent } from './authorization-exchange-list/authorization-exchange-list.component';
import { AuthorizationExchangeViewComponent } from './authorization-exchange-view/authorization-exchange-view.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationExchangeListComponent,
    canActivate: [AuthorizationExchangeGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AuthorizationExchangeNewComponent,
    canActivate: [AuthorizationExchangeGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AuthorizationExchangeEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AuthorizationExchangeListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AuthorizationExchangeViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AuthorizationExchangeRoutingModule {
}
