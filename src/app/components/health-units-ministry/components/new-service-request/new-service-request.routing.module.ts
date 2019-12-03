import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { NewServiceRequestGuard } from './shared/new-service-request.guard';
import { NewServiceRequestNewComponent } from './new-service-request-new/new-service-request-new.component';
import { NewServiceRequestEditComponent } from './new-service-request-edit/new-service-request-edit.component';
import { NewServiceRequestListComponent } from './new-service-request-list/new-service-request-list.component';
import { NewServiceRequestViewComponent } from './new-service-request-view/new-service-request-view.component';

const routes: Routes = [
  {
    path: '',
    component: NewServiceRequestListComponent,
    canActivate: [NewServiceRequestGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: NewServiceRequestNewComponent,
    canActivate: [NewServiceRequestGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: NewServiceRequestEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: NewServiceRequestListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: NewServiceRequestViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class NewServiceRequestRoutingModule {
}
