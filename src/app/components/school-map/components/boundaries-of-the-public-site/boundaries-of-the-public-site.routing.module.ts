import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BoundariesOfThePublicSiteGuard } from './shared/boundaries-of-the-public-site.guard';
import { BoundariesOfThePublicSiteNewComponent } from './boundaries-of-the-public-site-new/boundaries-of-the-public-site-new.component';
import { BoundariesOfThePublicSiteEditComponent } from './boundaries-of-the-public-site-edit/boundaries-of-the-public-site-edit.component';
import { BoundariesOfThePublicSiteListComponent } from './boundaries-of-the-public-site-list/boundaries-of-the-public-site-list.component';
import { BoundariesOfThePublicSiteViewComponent } from './boundaries-of-the-public-site-view/boundaries-of-the-public-site-view.component';

const routes: Routes = [
  {
    path: '',
    component: BoundariesOfThePublicSiteListComponent,
    canActivate: [BoundariesOfThePublicSiteGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BoundariesOfThePublicSiteNewComponent,
    canActivate: [BoundariesOfThePublicSiteGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BoundariesOfThePublicSiteEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BoundariesOfThePublicSiteListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BoundariesOfThePublicSiteViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BoundariesOfThePublicSiteRoutingModule {
}
