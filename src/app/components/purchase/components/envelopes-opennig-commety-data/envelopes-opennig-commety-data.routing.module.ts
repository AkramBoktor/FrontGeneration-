import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { EnvelopesOpennigCommetyDataGuard } from './shared/envelopes-opennig-commety-data.guard';
import { EnvelopesOpennigCommetyDataNewComponent } from './envelopes-opennig-commety-data-new/envelopes-opennig-commety-data-new.component';
import { EnvelopesOpennigCommetyDataEditComponent } from './envelopes-opennig-commety-data-edit/envelopes-opennig-commety-data-edit.component';
import { EnvelopesOpennigCommetyDataListComponent } from './envelopes-opennig-commety-data-list/envelopes-opennig-commety-data-list.component';
import { EnvelopesOpennigCommetyDataViewComponent } from './envelopes-opennig-commety-data-view/envelopes-opennig-commety-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: EnvelopesOpennigCommetyDataListComponent,
    canActivate: [EnvelopesOpennigCommetyDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: EnvelopesOpennigCommetyDataNewComponent,
    canActivate: [EnvelopesOpennigCommetyDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: EnvelopesOpennigCommetyDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: EnvelopesOpennigCommetyDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: EnvelopesOpennigCommetyDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class EnvelopesOpennigCommetyDataRoutingModule {
}
