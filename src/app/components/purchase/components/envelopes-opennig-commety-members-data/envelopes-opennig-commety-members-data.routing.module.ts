import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EnvelopesOpennigCommetyMembersDataGuard } from './shared/envelopes-opennig-commety-members-data.guard';
import { EnvelopesOpennigCommetyMembersDataNewComponent } from './envelopes-opennig-commety-members-data-new/envelopes-opennig-commety-members-data-new.component';
import { EnvelopesOpennigCommetyMembersDataEditComponent } from './envelopes-opennig-commety-members-data-edit/envelopes-opennig-commety-members-data-edit.component';
import { EnvelopesOpennigCommetyMembersDataListComponent } from './envelopes-opennig-commety-members-data-list/envelopes-opennig-commety-members-data-list.component';
import { EnvelopesOpennigCommetyMembersDataViewComponent } from './envelopes-opennig-commety-members-data-view/envelopes-opennig-commety-members-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: EnvelopesOpennigCommetyMembersDataListComponent,
    canActivate: [EnvelopesOpennigCommetyMembersDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EnvelopesOpennigCommetyMembersDataNewComponent,
    canActivate: [EnvelopesOpennigCommetyMembersDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EnvelopesOpennigCommetyMembersDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EnvelopesOpennigCommetyMembersDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EnvelopesOpennigCommetyMembersDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EnvelopesOpennigCommetyMembersDataRoutingModule {
}
