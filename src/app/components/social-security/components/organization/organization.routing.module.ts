import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { OrganizationGuard } from './shared/organization.guard';
import { OrganizationNewComponent } from './organization-new/organization-new.component';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationViewComponent } from './organization-view/organization-view.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationListComponent,
    canActivate: [OrganizationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: OrganizationNewComponent,
    canActivate: [OrganizationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: OrganizationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: OrganizationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: OrganizationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class OrganizationRoutingModule {
}
