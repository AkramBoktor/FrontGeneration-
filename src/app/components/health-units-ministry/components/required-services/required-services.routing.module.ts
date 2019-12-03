import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RequiredServicesGuard } from './shared/required-services.guard';
import { RequiredServicesNewComponent } from './required-services-new/required-services-new.component';
import { RequiredServicesEditComponent } from './required-services-edit/required-services-edit.component';
import { RequiredServicesListComponent } from './required-services-list/required-services-list.component';
import { RequiredServicesViewComponent } from './required-services-view/required-services-view.component';

const routes: Routes = [
  {
    path: '',
    component: RequiredServicesListComponent,
    canActivate: [RequiredServicesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RequiredServicesNewComponent,
    canActivate: [RequiredServicesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RequiredServicesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RequiredServicesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RequiredServicesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RequiredServicesRoutingModule {
}
