import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { GrantInformationGuard } from './shared/grant-information.guard';
import { GrantInformationNewComponent } from './grant-information-new/grant-information-new.component';
import { GrantInformationEditComponent } from './grant-information-edit/grant-information-edit.component';
import { GrantInformationListComponent } from './grant-information-list/grant-information-list.component';
import { GrantInformationViewComponent } from './grant-information-view/grant-information-view.component';

const routes: Routes = [
  {
    path: '',
    component: GrantInformationListComponent,
    canActivate: [GrantInformationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: GrantInformationNewComponent,
    canActivate: [GrantInformationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: GrantInformationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: GrantInformationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: GrantInformationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class GrantInformationRoutingModule {
}
