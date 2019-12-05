import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BuildingValidityCertificateGuard } from './shared/building-validity-certificate.guard';
import { BuildingValidityCertificateNewComponent } from './building-validity-certificate-new/building-validity-certificate-new.component';
import { BuildingValidityCertificateEditComponent } from './building-validity-certificate-edit/building-validity-certificate-edit.component';
import { BuildingValidityCertificateListComponent } from './building-validity-certificate-list/building-validity-certificate-list.component';
import { BuildingValidityCertificateViewComponent } from './building-validity-certificate-view/building-validity-certificate-view.component';

const routes: Routes = [
  {
    path: '',
    component: BuildingValidityCertificateListComponent,
    canActivate: [BuildingValidityCertificateGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BuildingValidityCertificateNewComponent,
    canActivate: [BuildingValidityCertificateGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BuildingValidityCertificateEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BuildingValidityCertificateListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BuildingValidityCertificateViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BuildingValidityCertificateRoutingModule {
}
