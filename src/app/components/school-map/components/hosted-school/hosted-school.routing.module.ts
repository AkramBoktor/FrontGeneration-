import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HostedSchoolGuard } from './shared/hosted-school.guard';
import { HostedSchoolNewComponent } from './hosted-school-new/hosted-school-new.component';
import { HostedSchoolEditComponent } from './hosted-school-edit/hosted-school-edit.component';
import { HostedSchoolListComponent } from './hosted-school-list/hosted-school-list.component';
import { HostedSchoolViewComponent } from './hosted-school-view/hosted-school-view.component';

const routes: Routes = [
  {
    path: '',
    component: HostedSchoolListComponent,
    canActivate: [HostedSchoolGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: HostedSchoolNewComponent,
    canActivate: [HostedSchoolGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: HostedSchoolEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: HostedSchoolListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: HostedSchoolViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class HostedSchoolRoutingModule {
}
