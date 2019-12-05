import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ServiceCodesGuard } from './shared/service-codes.guard';
import { ServiceCodesNewComponent } from './service-codes-new/service-codes-new.component';
import { ServiceCodesEditComponent } from './service-codes-edit/service-codes-edit.component';
import { ServiceCodesListComponent } from './service-codes-list/service-codes-list.component';
import { ServiceCodesViewComponent } from './service-codes-view/service-codes-view.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceCodesListComponent,
    canActivate: [ServiceCodesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ServiceCodesNewComponent,
    canActivate: [ServiceCodesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ServiceCodesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ServiceCodesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ServiceCodesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ServiceCodesRoutingModule {
}
