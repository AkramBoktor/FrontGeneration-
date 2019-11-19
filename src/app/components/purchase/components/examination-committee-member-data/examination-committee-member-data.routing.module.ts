import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExaminationCommitteeMemberDataGuard } from './shared/examination-committee-member-data.guard';
import { ExaminationCommitteeMemberDataNewComponent } from './examination-committee-member-data-new/examination-committee-member-data-new.component';
import { ExaminationCommitteeMemberDataEditComponent } from './examination-committee-member-data-edit/examination-committee-member-data-edit.component';
import { ExaminationCommitteeMemberDataListComponent } from './examination-committee-member-data-list/examination-committee-member-data-list.component';
import { ExaminationCommitteeMemberDataViewComponent } from './examination-committee-member-data-view/examination-committee-member-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationCommitteeMemberDataListComponent,
    canActivate: [ExaminationCommitteeMemberDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExaminationCommitteeMemberDataNewComponent,
    canActivate: [ExaminationCommitteeMemberDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExaminationCommitteeMemberDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExaminationCommitteeMemberDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExaminationCommitteeMemberDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExaminationCommitteeMemberDataRoutingModule {
}
