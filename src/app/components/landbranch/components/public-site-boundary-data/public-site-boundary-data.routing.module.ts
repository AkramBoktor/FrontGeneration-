import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PublicSiteBoundaryDataGuard } from './shared/public-site-boundary-data.guard';
import { PublicSiteBoundaryDataNewComponent } from './public-site-boundary-data-new/public-site-boundary-data-new.component';
import { PublicSiteBoundaryDataEditComponent } from './public-site-boundary-data-edit/public-site-boundary-data-edit.component';
import { PublicSiteBoundaryDataListComponent } from './public-site-boundary-data-list/public-site-boundary-data-list.component';
import { PublicSiteBoundaryDataViewComponent } from './public-site-boundary-data-view/public-site-boundary-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: PublicSiteBoundaryDataListComponent,
    canActivate: [PublicSiteBoundaryDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PublicSiteBoundaryDataNewComponent,
    canActivate: [PublicSiteBoundaryDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PublicSiteBoundaryDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PublicSiteBoundaryDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PublicSiteBoundaryDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PublicSiteBoundaryDataRoutingModule {
}
