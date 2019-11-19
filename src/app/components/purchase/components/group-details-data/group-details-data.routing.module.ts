import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { GroupDetailsDataGuard } from './shared/group-details-data.guard';
import { GroupDetailsDataNewComponent } from './group-details-data-new/group-details-data-new.component';
import { GroupDetailsDataEditComponent } from './group-details-data-edit/group-details-data-edit.component';
import { GroupDetailsDataListComponent } from './group-details-data-list/group-details-data-list.component';
import { GroupDetailsDataViewComponent } from './group-details-data-view/group-details-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: GroupDetailsDataListComponent,
    canActivate: [GroupDetailsDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: GroupDetailsDataNewComponent,
    canActivate: [GroupDetailsDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: GroupDetailsDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: GroupDetailsDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: GroupDetailsDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class GroupDetailsDataRoutingModule {
}
