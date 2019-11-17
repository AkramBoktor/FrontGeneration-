import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MembershipDataGuard } from './shared/membership-data.guard';
import { MembershipDataNewComponent } from './membership-data-new/membership-data-new.component';
import { MembershipDataEditComponent } from './membership-data-edit/membership-data-edit.component';
import { MembershipDataListComponent } from './membership-data-list/membership-data-list.component';
import { MembershipDataViewComponent } from './membership-data-view/membership-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: MembershipDataListComponent,
    canActivate: [MembershipDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MembershipDataNewComponent,
    canActivate: [MembershipDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MembershipDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MembershipDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MembershipDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MembershipDataRoutingModule {
}
