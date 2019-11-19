import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SupplementaryRecordGuard } from './shared/supplementary-record.guard';
import { SupplementaryRecordNewComponent } from './supplementary-record-new/supplementary-record-new.component';
import { SupplementaryRecordEditComponent } from './supplementary-record-edit/supplementary-record-edit.component';
import { SupplementaryRecordListComponent } from './supplementary-record-list/supplementary-record-list.component';
import { SupplementaryRecordViewComponent } from './supplementary-record-view/supplementary-record-view.component';

const routes: Routes = [
  {
    path: '',
    component: SupplementaryRecordListComponent,
    canActivate: [SupplementaryRecordGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SupplementaryRecordNewComponent,
    canActivate: [SupplementaryRecordGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SupplementaryRecordEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SupplementaryRecordListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SupplementaryRecordViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SupplementaryRecordRoutingModule {
}
