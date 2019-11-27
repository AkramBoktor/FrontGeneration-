import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SubscribersDataInServicesAssociationGuard } from './shared/subscribers-data-in-services-association.guard';
import { SubscribersDataInServicesAssociationNewComponent } from './subscribers-data-in-services-association-new/subscribers-data-in-services-association-new.component';
import { SubscribersDataInServicesAssociationEditComponent } from './subscribers-data-in-services-association-edit/subscribers-data-in-services-association-edit.component';
import { SubscribersDataInServicesAssociationListComponent } from './subscribers-data-in-services-association-list/subscribers-data-in-services-association-list.component';
import { SubscribersDataInServicesAssociationViewComponent } from './subscribers-data-in-services-association-view/subscribers-data-in-services-association-view.component';

const routes: Routes = [
  {
    path: '',
    component: SubscribersDataInServicesAssociationListComponent,
    canActivate: [SubscribersDataInServicesAssociationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SubscribersDataInServicesAssociationNewComponent,
    canActivate: [SubscribersDataInServicesAssociationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SubscribersDataInServicesAssociationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SubscribersDataInServicesAssociationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SubscribersDataInServicesAssociationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SubscribersDataInServicesAssociationRoutingModule {
}
