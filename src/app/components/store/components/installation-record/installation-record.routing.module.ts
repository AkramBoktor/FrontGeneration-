import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { InstallationRecordGuard } from './shared/installation-record.guard';
import { InstallationRecordNewComponent } from './installation-record-new/installation-record-new.component';
import { InstallationRecordEditComponent } from './installation-record-edit/installation-record-edit.component';
import { InstallationRecordListComponent } from './installation-record-list/installation-record-list.component';
import { InstallationRecordViewComponent } from './installation-record-view/installation-record-view.component';

const routes: Routes = [
  {
    path: '',
    component: InstallationRecordListComponent,
    canActivate: [InstallationRecordGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: InstallationRecordNewComponent,
    canActivate: [InstallationRecordGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: InstallationRecordEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: InstallationRecordListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: InstallationRecordViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class InstallationRecordRoutingModule {
}
