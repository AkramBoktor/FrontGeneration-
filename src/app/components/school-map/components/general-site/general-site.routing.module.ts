import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { GeneralSiteGuard } from './shared/general-site.guard';
import { GeneralSiteNewComponent } from './general-site-new/general-site-new.component';
import { GeneralSiteEditComponent } from './general-site-edit/general-site-edit.component';
import { GeneralSiteListComponent } from './general-site-list/general-site-list.component';
import { GeneralSiteViewComponent } from './general-site-view/general-site-view.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralSiteListComponent,
    canActivate: [GeneralSiteGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: GeneralSiteNewComponent,
    canActivate: [GeneralSiteGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: GeneralSiteEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: GeneralSiteListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: GeneralSiteViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class GeneralSiteRoutingModule {
}
