import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { NewServicesRequestsGuard } from './shared/new-services-requests.guard';
import { NewServicesRequestsNewComponent } from './new-services-requests-new/new-services-requests-new.component';
import { NewServicesRequestsEditComponent } from './new-services-requests-edit/new-services-requests-edit.component';
import { NewServicesRequestsListComponent } from './new-services-requests-list/new-services-requests-list.component';
import { NewServicesRequestsViewComponent } from './new-services-requests-view/new-services-requests-view.component';

const routes: Routes = [
  {
    path: '',
    component: NewServicesRequestsListComponent,
    canActivate: [NewServicesRequestsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: NewServicesRequestsNewComponent,
    canActivate: [NewServicesRequestsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: NewServicesRequestsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: NewServicesRequestsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: NewServicesRequestsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class NewServicesRequestsRoutingModule {
}
