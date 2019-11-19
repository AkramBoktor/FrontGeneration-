import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThirdPartyCodesGuard } from './shared/third-party-codes.guard';
import { ThirdPartyCodesEditComponent } from './third-party-codes-edit/third-party-codes-edit.component';
import { ThirdPartyCodesListComponent } from './third-party-codes-list/third-party-codes-list.component';
import { ThirdPartyCodesNewComponent } from './third-party-codes-new/third-party-codes-new.component';
import { ThirdPartyCodesViewComponent } from './third-party-codes-view/third-party-codes-view.component';

const routes: Routes = [
  {
    path: '',
    component: ThirdPartyCodesListComponent,
    canActivate: [ThirdPartyCodesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ThirdPartyCodesNewComponent,
    canActivate: [ThirdPartyCodesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ThirdPartyCodesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ThirdPartyCodesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ThirdPartyCodesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ThirdPartyCodesRoutingModule {
}
